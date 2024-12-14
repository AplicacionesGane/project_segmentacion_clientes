import { getReportOracle } from '@controllers/oracle.reports'
import { Router } from 'express'

export const oracleRouter = Router();

oracleRouter.post('/report', getReportOracle);