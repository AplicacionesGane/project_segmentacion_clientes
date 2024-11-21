import { Premios } from '../models/premios.model';
import { CantidadPremios } from '../services';
import { Request, Response } from 'express';
import { col, fn, literal, Op } from 'sequelize';
import { generateData } from '../utils';
import { Client } from '../models/clientes.model';

export const getInfo = async (req: Request, res: Response) => {
  const fecha: string | undefined = req.query.fecha as string | undefined;

  try {
    const Multired = await CantidadPremios(fecha, 39627);
    const Servired = await CantidadPremios(fecha, 39628);

    const dataMultired = generateData(Multired);
    const dataServired = generateData(Servired);

    res.status(200).json([{ empresa: 'Multired', data: dataMultired }, { empresa: 'Servired', data: dataServired }]);
  } catch (error) {
    console.log(error);
    res.status(500).json('Internal server error');
  }
}

export const getInfo2 = async (req: Request, res: Response) => {
  const fecha: string | undefined = req.query.fecha as string | undefined;

  const opc = fecha !== undefined && fecha !== 'undefined' ? fecha.slice(0, 10) : fn('CURDATE');

  try {
    const PremiosServired = await Premios.findAll({
      attributes: ['TIPOPREMIO', [fn('COUNT', 'TIPOPREMIO'), 'CANT']],
      where: { FECHAPAGO: opc, ZONA: '39627' },
      group: ['TIPOPREMIO']
    })

    const PremiosMultired = await Premios.findAll({
      attributes: ['TIPOPREMIO', [fn('COUNT', 'TIPOPREMIO'), 'CANT']],
      where: { FECHAPAGO: opc, ZONA: '39628' },
      group: ['TIPOPREMIO']
    });

    res.status(200).json({ Multired: PremiosMultired, Servired: PremiosServired });
  } catch (error) {
    console.log(error);
    res.status(500).json('Internal server error');
  }
}

export const getReportBaloto = async (req: Request, res: Response) => {
  const data = req.body;

  const { fecha1, fecha2, zona } = data;

  if (fecha1 === undefined || fecha2 === undefined) {
    res.status(400).json('Fecha no válida');
  }

  if (zona === undefined) {
    res.status(400).json('Zona no válida');
  }

  try {
    const report = await Premios.findAll({
      attributes: ['SERIE_CONSECUTIVO', 'TIPOPREMIO', 'PREMIO', 'RETEFUENTE', 'CAJERO', 'FECHAPAGO', 'TERCERO', 'ZONA'],
      where: {
        FECHAPAGO: { [Op.between]: [fecha1, fecha2] },
        TIPOJUEGO: { [Op.in]: [110, 116, 119] },
        ZONA: zona
      }
    });

    res.status(200).json(report);
  } catch (error) {
    console.log(error);
    res.status(500).json('Internal server error');
  }
}


export const getClientesGanadores = async (req: Request, res: Response) => {
  const data = req.body;

  const { fecha1, fecha2, zona } = data;

  if (fecha1 === undefined || fecha2 === undefined) {
    res.status(400).json('Fecha no válida');
  }

  if (zona === undefined) {
    res.status(400).json('Zona no válida');
  }

  try {
    const ReportData = await Premios.findAll({
      attributes: [
        [fn('SUM', col('PREMIO')), 'TOTALPREMIOS'],
        [fn('COUNT', fn('DISTINCT', col('SERIE_KARDEX'))), 'CANT']
      ],
      where: {
        FECHAPAGO: { [Op.between]: [fecha1, fecha2] },
        TIPOPREMIO: 'LOCAL',
        ZONA: zona
      },
      include: [{
        attributes: ['DOCUMENTO', 'NOMBRES', 'DIRECCION', 'TELEFONO1'],
        model: Client,
        required: true
      }],
      group: ['DOCUMENTO', 'NOMBRES', 'DIRECCION', 'TELEFONO1'],
      order: literal('TOTALPREMIOS DESC'),
    });

    res.status(200).json(ReportData);
  } catch (error) {
    console.log(error);
    res.status(500).json('Internal server error');
  }
}

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
        'FECHAPAGO',
        [literal("COUNT(CASE WHEN TIPOPREMIO IN ('LOCAL') THEN 1 END)"), 'CANT_PREMIOS_CHANCE'],
        [literal("COUNT(CASE WHEN TIPOPREMIO IN ('ASTRO') THEN 1 END)"), 'CANT_PREMIOS_ASTRO'],
        [literal("COUNT(CASE WHEN TIPOPREMIO IN ('REMOTO') THEN 1 END)"), 'CANT_PREMIOS_LOTERIA'],
        [literal("COUNT(CASE WHEN TIPOJUEGO IN ('107') THEN 1 END)"), 'CANT_PREMIOS_RASPE'],
        [fn('SUM', col('PREMIO')), 'TOTAL_PREMIOS_COBRADOS'],
      ],
      where: {
        FECHAPAGO: { [Op.between]: [fecha1, fecha2] },
        ZONA: zona,
      },
      include: [
        {
          attributes: ['TIPODOCUMENTO', 'NOMBRES', 'CATEGORIA', 'DIRECCION', 'TELEFONO1'],
          model: Client,
          where: {
            CATEGORIA: { [Op.in]: ['TR', 'CC', 'CI'] },
          },
          required: true,
        },
      ],
      group: ['Premios.TERCERO','Premios.PREMIO','Premios.FECHAPAGO','Client.TIPODOCUMENTO','Client.NOMBRES','Client.CATEGORIA','Client.DIRECCION','Client.TELEFONO1',
      ],
    });    

    res.status(200).json(ReportCobrados);
  } catch (error) {
    console.log(error);
    res.status(500).json('Internal server error');
  }
};


