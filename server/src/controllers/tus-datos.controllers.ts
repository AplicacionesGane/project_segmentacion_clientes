import { AUTH_API_DATOS_PASS, AUTH_API_DATOS_URL, AUTH_API_DATOS_USER } from '@config/enviroments';
import { validateInfo } from "@schemas/tus-datos";
import { Request, Response } from "express";
import { z } from "zod/v4";
import axios from "axios";

export const newRequestInfo = async (req: Request, res: Response) => {
  const { success, data, error } = validateInfo(req.body);

  if (!success) {
    const treeifiedErrors = z.treeifyError(error);

    res.status(400).json({
      message: "Errores de validación",
      error: treeifiedErrors,
    });
    return;
  }
  
  const { doc, typedoc, fechaE, nombres } = data;

  try {
    const response = await axios.post(
      `${AUTH_API_DATOS_URL}/launch`,
      { doc, typedoc, fechaE, nombres }, 
      {
        auth: {
          username: AUTH_API_DATOS_USER,
          password: AUTH_API_DATOS_PASS
        },
        headers: {
          'Content-Type': 'application/json'
        },
        timeout: 30000 // 30 segundos de timeout
      }
    );

    res.status(200).json({
      message: "Solicitud enviada correctamente",
      data: response.data
    });

  } catch (error) {
    console.error("Error al enviar la solicitud:", error);
    
    if (axios.isAxiosError(error)) {
      // Manejo específico de errores de Axios
      if (error.response?.status === 401) {
        res.status(401).json({
          error: "Credenciales de autenticación inválidas"
        });
      } else if (error.response?.status === 403) {
        res.status(403).json({
          error: "Acceso denegado a la API"
        });
      } else {
        res.status(error.response?.status || 500).json({
          error: "Error en la API externa",
          details: error.response?.data || error.message
        });
      }
    } else {
      res.status(500).json({
        error: "Error interno del servidor"
      });
    }
  }
}