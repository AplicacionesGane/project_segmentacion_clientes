import { connectionOracle } from '@connections/oracledb';
import { Request, Response } from 'express';
import { RowType } from '@type/interface';
import { Connection } from 'oracledb';

const FunBetweenDates = (startDate: string, endDate: string) => `fechapago BETWEEN TO_DATE('${startDate}', 'DD/MM/YYYY') AND TO_DATE('${endDate}', 'DD/MM/YYYY')`;
const aplanarString = (arr: number[]) => arr.map((el) => `'${el}'`).join(',');
const municipio = (zona: '39627' | '39628') => zona === '39627' ? `39629, 39630, 39631` : `39632`;

export const getReportOracle = async (req: Request, res: Response) => {
  const data = req.body;

  const { fecha1, fecha2, zona } = data;

  if (!fecha1 || !fecha2 || !zona) {
    res.status(400).json('Fechas y zona son requeridas');
  }

  const fecha1Reverse = fecha1.split('-').reverse().join('/');
  const fecha2Reverse = fecha2.split('-').reverse().join('/');

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
    const datesStr = FunBetweenDates(fecha1Reverse, fecha2Reverse);
    const zonaStr = municipio(zona);

    const { rows: rows2, metaData } = await connection.execute<RowType[]>(
      `
      SELECT 
        TT.FECHAPAGO, TT.SERIE, TT.PREMIO, TT.VENDEDOR, TT.HORA, TT.PUNTO_VTA_PAGO, TT.DOCUMENTOTERCERO CLIENTE,
        UPPER(PE.NOMBRES||' '||PE.APELLIDO1||' '||PE.APELLIDO2) NOMBRES,
        UPPER(CL.NOMBRES||' '||CL.APELLIDO1||' '||CL.APELLIDO2) NOMBRECLIENTE,
        UN.TRTRIO_CODIGO_COMPUESTO_DE MUNICIPIO
      FROM(
        select FECHAPAGO, SERIE||NUMERO SERIE, TOTALPREMIO-RETEFUENTE PREMIO, SUBSTR(LOGINCAJERO,4) VENDEDOR, HORA, PUNTO_VTA_PAGO, DOCUMENTOTERCERO 
        from premiospersonaproveedor@CONSULTAS
        where ${datesStr}
        and documentocajero in (${strUsers})
      )TT
      LEFT JOIN PERSONAS PE ON (PE.DOCUMENTO=TT.VENDEDOR)
      LEFT JOIN PERSONAS CL ON (CL.DOCUMENTO=TT.DOCUMENTOTERCERO)
      LEFT JOIN UBICACIONNEGOCIOS UN ON (UN.TRTRIO_CODIGO=TT.PUNTO_VTA_PAGO)
      WHERE UN.TRTRIO_CODIGO_COMPUESTO_DE IN (${zonaStr})
      ORDER BY TT.FECHAPAGO 
      `
    );

    const data = rows2?.map(row => {
      return metaData?.reduce((acc, meta, index) => {
        acc[meta.name.toLowerCase()] = row[index];
        return acc;
      }, {} as Record<string | number, any>);
    });

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
