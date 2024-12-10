import { Premios } from '../models/premios.model';
import { Request, Response } from 'express';
import {col, fn, literal, Op } from 'sequelize';
import { Client } from '../models/clientes.model';

const EvaluarTipoPremio = (tipo: string) => literal(`CASE WHEN TIPOPREMIO IN ('${tipo}') THEN 1 END`);
const EvaluarTipoPremio2 = (tipo: string) => literal(`CASE WHEN TIPOJUEGO IN ('${tipo}') THEN 1 END`);

export const getReportCobrados = async (req: Request, res: Response) => {
  const data = req.body;

  const { fecha1, fecha2, zona } = data;

  if (fecha1 === undefined || fecha2 === undefined) {
    res.status(400).json('Fecha no válida');
  }

  if (zona === undefined) {
    res.status(400).json('Zona no válida');
  }

  try {
    const ReportCobrados = await Premios.findAll({
      attributes: [
        'TERCERO',
        [fn('COUNT', EvaluarTipoPremio('LOCAL')), 'CANT_PREMIOS_CHANCE'],
        [fn('COUNT', EvaluarTipoPremio('ASTRO')), 'CANT_PREMIOS_ASTRO'],
        [fn('COUNT', EvaluarTipoPremio('REMOTO')), 'CANT_PREMIOS_LOTERIA'],
        [fn('COUNT', EvaluarTipoPremio2('107')), 'CANT_PREMIOS_RASPE'],
        [fn('SUM', col('PREMIO')), 'TOTAL_PREMIOS_COBRADOS'],
      ],
      where: {
        FECHAPAGO: { [Op.between]: [fecha1, fecha2] },
        ZONA: zona,
      },
      include: [{
        attributes: ['TIPODOCUMENTO', 'NOMBRES', 'CATEGORIA', 'DIRECCION', 'TELEFONO1'],
        model: Client,
        where: { CATEGORIA: { [Op.in]: ['TR', 'CC', 'CI'] } },
      }],
      group: ['TERCERO']
    });

    res.status(200).json(ReportCobrados);
  } catch (error) {
    console.log(error);
    res.status(500).json('Internal server error');
  }
};

const EvaluarTipoMayores = (tipo1: string, tipo2: string) => `WHEN '${tipo1}' THEN '${tipo2}'`;
export const getReportMayores = async (req: Request, res: Response) => {
  const data = req.body;

  const { fecha1, fecha2, zona } = data;

  if (fecha1 === undefined || fecha2 === undefined) {
    res.status(400).json('Fecha no válida');
  }

  if (zona === undefined) {
    res.status(400).json('Zona no válida');
  }

  try {
    const ReportCobrados = await Premios.findAll({
      attributes: [
        'FECHAPAGO',
        'SERIE_KARDEX',
        'SERIE_CONSECUTIVO',
        'TERCERO',
        [fn('SUM', col('PREMIO')), 'TOTAL_PREMIOS'],
        [
          literal(`
            CASE CCOSTO
              ${EvaluarTipoMayores('39629', '76892')}
              ${EvaluarTipoMayores('39630', '76869')}
              ${EvaluarTipoMayores('39631', '76377')}
              ${EvaluarTipoMayores('39632', '76364')}
              ELSE 'Desconocido'
            END
          `),
          'COD_DANE',
        ],
      ],
      where: {
        FECHAPAGO: { [Op.between]: [fecha1, fecha2] },
        ZONA: zona,
        TIPOPREMIO: { [Op.in]: ['LOCAL', 'RSPEFE'] },
        PREMIO: { [Op.gt]: 15 * 47065 },

      },
      include: [{
        attributes: ['TIPODOCUMENTO', 'NOMBRES'],
        model: Client,
        required: true,
      }],
      group: ['FECHAPAGO', 'SERIE_KARDEX', 'SERIE_CONSECUTIVO', 'TERCERO', 'TIPODOCUMENTO', 'NOMBRES', 'CCOSTO',],
      order: [[fn('SUM', col('PREMIO')), 'DESC']],
    });

    res.status(200).json(ReportCobrados);
  } catch (error) {
    console.log(error);
    res.status(500).json('Internal server error');
  }
};

const EvaluarTipLAFT = (tipo: string) => literal(`CASE WHEN TIPOPREMIO IN ('${tipo}') THEN 1 ELSE 0 END`);
const EvaluarTipLAFT2 = (tipo: string) => literal(`CASE WHEN TIPOJUEGO IN ('${tipo}') THEN 1 ELSE 0 END`);

export const getReportLAFT = async (req: Request, res: Response) => {
  const data = req.body;

  const { fecha1, fecha2, zona } = data;

  if (fecha1 === undefined || fecha2 === undefined) {
    res.status(400).json('Fecha no válida');
  }

  if (zona === undefined) {
    res.status(400).json('Zona no válida');
  }

  try {
    const ReportCobrados = await Premios.findAll({
      attributes: [
        'TERCERO',
        [fn('COUNT', EvaluarTipLAFT('LOCAL')), 'CANT_PREMIOS_CHANCE'],
        [fn('COUNT', EvaluarTipLAFT('ASTRO')), 'CANT_PREMIOS_ASTRO'],
        [fn('COUNT', EvaluarTipLAFT('REMOTO')), 'CANT_PREMIOS_LOTERIA'],
        [fn('COUNT', EvaluarTipLAFT2('107')), 'CANT_PREMIOS_RASPE'],
        [fn('SUM', col('PREMIO')), 'TOTAL_PREMIOS_COBRADOS'],
      ],
      where: {
        FECHAPAGO: { [Op.between]: [fecha1, fecha2] },
        ZONA: zona,
        TIPOPREMIO: { [Op.in]: ['LOCAL', 'ASTRO', 'REMOTO', 'RSPEFE', 'RSPEFE', 'RSPREC'] },
      },
      include: [{
        attributes: ['TIPODOCUMENTO', 'NOMBRES', 'DIRECCION', 'TELEFONO1', 'PEP'],
        model: Client,
        required: true,
      }],
      group: ['TIPODOCUMENTO', 'TERCERO', 'NOMBRES', 'TELEFONO1', 'DIRECCION','PEP'],
      order: [[fn('SUM', col('PREMIO')), 'DESC']]
    });

    res.status(200).json(ReportCobrados);
  } catch (error) {
    console.log(error);
    res.status(500).json('Internal server error');
  }
};
