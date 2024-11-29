import { connectionOracle } from '../connection/oracledb';
import { Request, Response } from 'express';
import { Connection } from 'oracledb';

export type RowType = [
  string, // FECHAPAGO
  string, // SERIE
  number, // PREMIO
  string, // VENDEDOR
  string, // NOMBRES
  string, // HORA
  number, // PUNTO_VTA_PAGO
  number, // APLICACION
  string // MUNICIPIO
];

const FunBetweenDates = (startDate: string, endDate: string) => `fechapago BETWEEN TO_DATE('${startDate}', 'DD/MM/YYYY') AND TO_DATE('${endDate}', 'DD/MM/YYYY')`;
const aplanarString = (arr: number[]) => arr.map((el) => `'${el}'`).join(',');

export const getReportOracle = async (req: Request, res: Response) => {
  const data = req.body;

  const { fecha1, fecha2, zona } = data;

  if (!fecha1 || !fecha2 || !zona) {
    res.status(400).json('Fechas y zona son requeridas');
  }

  let connection: Connection | undefined;
  const pool = await connectionOracle();

  if (pool instanceof Error) {
    throw new Error('Error al intentar conectar a la base de datos')
  }

  connection = await pool.getConnection();

  try {
    const { rows } = await connection.execute<number[]>('SELECT distinct usuadocu FROM cerberus.ms_usuario WHERE grupcodi in (16,17)')
    // unir los arrays de arrays en un solo array
    const arrayUsers = rows?.flat();
    const strUsers = aplanarString(arrayUsers!);

    const { rows: rows2, metaData } = await connection.execute<RowType[]>(
      `
      SELECT 
        TT.FECHAPAGO, TT.SERIE, TT.PREMIO, TT.VENDEDOR, UPPER(PE.NOMBRES||' '||PE.APELLIDO1||' '||PE.APELLIDO2) NOMBRES,
        TT.HORA, TT.PUNTO_VTA_PAGO, TT.APLICACION, DECODE(UN.TRTRIO_CODIGO_COMPUESTO_DE, 39629,'YUMBO',39630,'VIJES',39631,'CUMBRE',39632,'JAMUNDI', UN.TRTRIO_CODIGO_COMPUESTO_DE) MUNICIPIO
      FROM(
        SELECT FECHAPAGO, SERIE||NUMERO SERIE, TOTALPREMIO-RETEFUENTE PREMIO, SUBSTR(LOGINCAJERO,4) VENDEDOR, HORA, PUNTO_VTA_PAGO, 1 APLICACION
        FROM premiospersonaproveedor
        WHERE ${FunBetweenDates(fecha1, fecha2)}
        AND documentocajero IN (${strUsers})
      UNION ALL
        SELECT FECHAPAGO, SERIE||NUMERO, TOTALPREMIO-RETEFUENTE PREMIO, SUBSTR(LOGINCAJERO,4) VENDEDOR, HORA, PUNTO_VTA_PAGO, 2 APLICACION
        FROM premiospersonaproveedor@CONSULTAS 
        WHERE ${FunBetweenDates(fecha1, fecha2)}
        AND documentocajero in (${strUsers})
        AND serie||numero NOT IN (
          SELECT distinct SERIE||NUMERO FROM premiospersonaproveedor 
          WHERE ${FunBetweenDates(fecha1, fecha2)}
          AND documentocajero IN (${strUsers})
          )
        )
      TT, PERSONAS PE, UBICACIONNEGOCIOS UN
      WHERE PE.DOCUMENTO=TT.VENDEDOR
      AND UN.TRTRIO_CODIGO=TT.PUNTO_VTA_PAGO
      AND UN.TRTRIO_CODIGO_COMPUESTO_DE IN (39629,39630,39631) 
      ORDER BY TT.FECHAPAGO,TT.APLICACION
      `
    );

    const data = rows2?.map(row => {
      return metaData?.reduce((acc, meta, index) => {
        acc[meta.name.toLowerCase()] = row[index];
        return acc;
      }, {} as Record<string | number, any>);
    });

    console.log(data?.length);

    res.status(200).json(data);
  } catch (error) {
    console.log(error)
    res.status(500).json(error);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (error) {
        console.log('Error al cerrar la conexión', error);
      }
    }
  }
}
