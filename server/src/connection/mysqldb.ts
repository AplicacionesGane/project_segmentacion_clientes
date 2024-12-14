import { DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASS } from '../config/enviroments';
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  port: parseInt(DB_PORT),
  dialect: 'mysql',
  timezone: '-05:00',
});

export default sequelize;