import { DB_ORACLE_DIR, DB_ORACLE_DIR_TNS, DB_ORACLE_NAME, DB_ORACLE_PASS, DB_ORACLE_USER } from '../config/envOracleDb';
import oracledb, { Pool } from 'oracledb';

oracledb.initOracleClient({ libDir: DB_ORACLE_DIR });

export async function connectionOracle(): Promise<Pool | Error> {
  try {
    const pool = await oracledb.createPool({
      user: DB_ORACLE_USER,
      password: DB_ORACLE_PASS,
      configDir: DB_ORACLE_DIR_TNS,
      connectString: DB_ORACLE_NAME
    })

    if (!pool) throw new Error('Error connecting to Oracle database');

    return pool;
  } catch (error) {
    console.error('Error connecting to Oracle database', error);
    return error as Error;
  }
}