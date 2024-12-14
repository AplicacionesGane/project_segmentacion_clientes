import { clientRoutes } from '@routes/clientes.routes';
import { oracleRouter } from '@routes/oracle.routes';
import { infoRouter } from '@routes/info.routes';

import { PORT, ORIGIN } from '@config/enviroments';

import express from 'express';
import log from 'morgan';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors(
  {
    origin: ORIGIN,
    credentials: true
  }
));
app.use(log('dev'));

app.use('/', clientRoutes);
app.use('/', infoRouter);
app.use('/oracle', oracleRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

