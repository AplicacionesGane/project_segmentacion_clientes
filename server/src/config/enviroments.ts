import { z } from 'zod'

const envSchema = z.object({
  PORT: z.string().min(1, 'Variable PORT is required'),
  ORIGIN: z.string().min(1, 'Variable ORIGIN is required').url().default('http://localhost:3000'),
  DB_HOST: z.string().min(1, 'Variable DB_HOST is required'),
  DB_PORT: z.string().min(1, 'Variable DB_PORT is required'),
  DB_USER: z.string().min(1, 'Variable DB_USER is required'),
  DB_PASS: z.string().min(1, 'Variable DB_PASS is required'),
  DB_NAME: z.string().min(1, 'Variable DB_NAME is required'),
  AUTH_API_DATOS_URL: z.string().min(1, 'Variable AUTH_API_DATOS_URL is required').url(),
  AUTH_API_DATOS_USER: z.string().min(1, 'Variable AUTH_API_DATOS_USER is required'),
  AUTH_API_DATOS_PASS: z.string().min(1, 'Variable AUTH_API_DATOS_PASS is required')
})

const { success, data, error } = envSchema.safeParse(process.env)

if (!success) {
  console.error("Error en la configuración de las variables de entorno:", error.format());
  process.exit(1)
}

export const {
  PORT,
  ORIGIN,
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASS,
  DB_NAME,
  AUTH_API_DATOS_URL,
  AUTH_API_DATOS_USER,
  AUTH_API_DATOS_PASS
} = data