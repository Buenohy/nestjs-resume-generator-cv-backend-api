import { createZodDto } from "nestjs-zod";
import { z } from "zod";

// Definição estrita do esquema de criação usando Zod
export const CreateExperienceSchema = z.object({
  language: z.enum(["pt", "en"]),
  role: z.string().min(1, "Cargo é obrigatório"),
  company: z.string().min(1, "Empresa é obrigatória"),
  url: z.string().url("URL inválida").optional().nullable(),
  date: z.string().min(1, "Período é obrigatório"),
  // Garante que details e stacks sejam arrays válidos com pelo menos 1 item
  details: z.array(z.string()).min(1, "Pelo menos um detalhe é obrigatório"),
  stacks: z.array(z.string()).min(1, "Pelo menos uma stack é obrigatória"),
});

export class CreateExperienceDto extends createZodDto(CreateExperienceSchema) {}
