import { getInfo, getInfo2, getReportBaloto, getClientesGanadores, getReportCobrados, getReportMayores } from '../controllers/info.controllers';
import { Router } from "express";

export const infoRouter = Router();

infoRouter.get('/getInfo', getInfo);

infoRouter.get('/getInfo2', getInfo2);

infoRouter.post('/reportBaloto', getReportBaloto);

infoRouter.post('/reporClientGanadores', getClientesGanadores);

infoRouter.post('/reporCobrados', getReportCobrados);

infoRouter.post('/reporMayores', getReportMayores);