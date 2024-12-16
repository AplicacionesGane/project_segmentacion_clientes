import { ConsultaResultAttrib } from '@type/interface';
import { Premios } from '@models/premios.model';
import { fn, literal } from 'sequelize';

const cantMin = 15
const cantMax = 48
const UVT = 47065

const menor15 = cantMin * UVT
const mayor48 = cantMax * UVT

/**
 * 
 * @param fecha string | Undefined
 * @param zone 39627 = Multired | 39628 = Servired
 * @returns Menor: string, Rango: string, Mayor: string 
 */

export const CantidadPremios = async (fecha: string | undefined, zone: 39627 | 39628) => {
  const opc = fecha !== undefined && fecha !== 'undefined' ? fecha.slice(0, 10) : fn('CURDATE');

  const Data: ConsultaResultAttrib[] = await Premios.findAll({
    attributes: [
      [fn('SUM', literal(`PREMIO < ${menor15}`)), 'Menor'],
      [fn('SUM', literal(`PREMIO BETWEEN ${menor15} AND ${mayor48}`)), 'Rango'],
      [fn('SUM', literal(`PREMIO > ${mayor48}`)), 'Mayor']
    ],
    where: {
      FECHAPAGO: opc,
      ZONA: zone
    },
    raw: true
  }) as unknown as ConsultaResultAttrib[];

  return Data[0]
}