import * as z from "zod/v4";

const fechaRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;

const newRequestInfoSchema = z.object({
  doc: z.string().min(2, "El documento es requerido"),
  typedoc: z.enum(["CC", "CE", "NIT"]),
  fechaE: z.string().regex(fechaRegex, "La fecha debe tener el formato DD/MM/YYYY").optional(),
  nombres: z.string().min(2, "El nombre es requerido").optional(),
})

export function validateInfo(params: unknown) {
  return newRequestInfoSchema.safeParse(params);
}