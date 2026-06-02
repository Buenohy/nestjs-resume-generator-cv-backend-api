import { createZodDto } from "nestjs-zod";
import { z } from "zod";

export const CreateExperienceSchema = z.object({
  language: z.enum(["pt", "en"], {
    message: "O idioma é obrigatório ('pt' ou 'en')",
  }),
  role: z.string().min(1, "Cargo é obrigatório"),
  company: z.string().min(1, "Empresa é obrigatória"),
  // url e date não são nativos em todas as views, aceitamos strings vazias ou nulas
  url: z.string().optional().nullable(),
  date: z.string().optional(),
  // Arrays com fallback automático para vazio se não forem enviados
  details: z.array(z.string()).default([]),
  stacks: z.array(z.string()).default([]),
});

export class CreateExperienceDto extends createZodDto(CreateExperienceSchema) {}
