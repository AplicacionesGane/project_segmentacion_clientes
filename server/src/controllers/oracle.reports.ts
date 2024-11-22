import { connectionOracle } from '../connection/oracledb';
import { Request, Response } from 'express';
import { Connection } from 'oracledb';

const FunBetweenDates = (startDate: string, endDate: string) => {
`
  BETWEEN TO_DATE('${startDate}','DD/MM/YYYY') AND TO_DATE('${endDate}','DD/MM/YYYY')
`;
}

const localPremios =
`
  SELECT 
    FECHAPAGO, 
    SERIE || NUMERO AS SERIE, 
    TOTALPREMIO - RETEFUENTE AS PREMIO, 
    SUBSTR(LOGINCAJERO, 4) AS VENDEDOR, 
    HORA, 
    PUNTO_VTA_PAGO, 
    1 AS APLICACION 
  FROM 
    premiospersonaproveedor
  WHERE 
    fechapago ${FunBetweenDates('01/10/2024', '31/10/2024')}
    AND documentocajero IN (
      SELECT DISTINCT usuadocu 
      FROM cerberus.ms_usuario 
      WHERE grupcodi IN (16, 17)
    )
`;

const remotePremios =
`
  SELECT 
    FECHAPAGO, 
    SERIE || NUMERO AS SERIE, 
    TOTALPREMIO - RETEFUENTE AS PREMIO, 
    SUBSTR(LOGINCAJERO, 4) AS VENDEDOR, 
    HORA, 
    PUNTO_VTA_PAGO, 
    2 AS APLICACION 
  FROM 
    premiospersonaproveedor@CONSULTAS
  WHERE 
    fechapago ${FunBetweenDates('01/10/2024', '31/10/2024')}
    AND documentocajero IN (
      SELECT DISTINCT usuadocu 
      FROM cerberus.ms_usuario 
      WHERE grupcodi IN (16, 17)
    )
    AND SERIE || NUMERO NOT IN (
      SELECT DISTINCT SERIE || NUMERO 
      FROM premiospersonaproveedor 
      WHERE fechapago ${FunBetweenDates('01/10/2024', '31/10/2024')}}
        AND documentocajero IN (
          SELECT DISTINCT usuadocu 
          FROM cerberus.ms_usuario 
          WHERE grupcodi IN (16, 17)
        )
    )
`;

export const getReportOracle = async (req: Request, res: Response) => {
  let connection: Connection | undefined;
  const pool = await connectionOracle();

  if (pool instanceof Error) {
    throw new Error('Error al intentar conectar a la base de datos')
  }

  connection = await pool.getConnection();

  try {
    const result = await connection.execute(
    `
      WITH 
        local_premios AS (${localPremios}),
        remote_premios AS (${remotePremios})
      SELECT 
        TT.FECHAPAGO, 
        TT.SERIE, 
        TT.PREMIO, 
        TT.VENDEDOR,
        UPPER(PE.NOMBRES || ' ' || PE.APELLIDO1 || ' ' || PE.APELLIDO2) AS NOMBRES,
        TT.HORA, 
        TT.PUNTO_VTA_PAGO, 
        TT.APLICACION,
        DECODE(UN.TRTRIO_CODIGO_COMPUESTO_DE, 39629, 'YUMBO', 39630, 'VIJES', 39631, 'CUMBRE', 39632, 'JAMUNDI', UN.TRTRIO_CODIGO_COMPUESTO_DE) AS MUNICIPIO
      FROM (
        SELECT * FROM local_premios
        UNION ALL
        SELECT * FROM remote_premios
      ) TT
      JOIN PERSONAS PE ON PE.DOCUMENTO = TT.VENDEDOR
      JOIN UBICACIONNEGOCIOS UN ON UN.TRTRIO_CODIGO = TT.PUNTO_VTA_PAGO
      WHERE UN.TRTRIO_CODIGO_COMPUESTO_DE IN (39629, 39630, 39631)
      ORDER BY TT.FECHAPAGO, TT.APLICACION
    `,
    );
    console.log(result.rows?.length);
    res.status(200).json(result);
  } catch (error) {
    console.log(error)
    res.status(500).json(error);
  }
}