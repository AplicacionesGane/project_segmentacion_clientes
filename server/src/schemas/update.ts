import { z } from 'zod';

const UpdateSchema = z.object({
  categoria: z.optional(z.string()),
  tipozona: z.optional(z.string()),
  documentos: z.array(z.string())
});

export type UpdateType = z.infer<typeof UpdateSchema>;

export function validateUpdate(data: unknown) {
  return UpdateSchema.safeParse(data);
}