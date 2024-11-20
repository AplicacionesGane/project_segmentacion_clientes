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