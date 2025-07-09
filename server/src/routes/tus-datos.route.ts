import { newRequestInfo, newRequestInfoVerify } from "@controllers/tus-datos.controllers";
import { Router } from "express";

export const tusDatosRoutes = Router();

tusDatosRoutes.post('/launch', newRequestInfo);

tusDatosRoutes.post('/verify', newRequestInfoVerify);