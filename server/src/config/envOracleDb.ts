import { z } from 'zod'

const envSchemaDbOracle = z.object({
  DB_ORACLE_USER: z.string().min(1, 'Variable DB_ORACLE_USER es requerida'),
  DB_ORACLE_PASS: z.string().min(1, 'Variable DB_ORACLE_PASS es requerida'),
  DB_ORACLE_NAME: z.string().min(1, 'Variable DB_ORACLE_NAME es requerida'),
  DB_ORACLE_DIR: z.string().min(1, 'Variable DB_ORACLE_DIR es requerida'),
  DB_ORACLE_DIR_TNS: z.string().min(1, 'Variable DB_ORACLE_DIR_TNS es requerida'),
})

const { success, data, error } = envSchemaDbOracle.safeParse(process.env)

if (!success) {
  console.error("Error en la configuración de las variables de entorno:", error.format());
  process.exit(1)
}

export const {
  DB_ORACLE_USER,
  DB_ORACLE_PASS,
  DB_ORACLE_NAME,
  DB_ORACLE_DIR,
  DB_ORACLE_DIR_TNS
} = data