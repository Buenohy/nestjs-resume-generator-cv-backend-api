import { createZodDto } from "nestjs-zod";
import { z } from "zod";

export const CreateHistorySchema = z.object({
  targetRole: z.string().min(1, "O cargo alvo é obrigatório"),
  targetCompany: z.string().min(1, "A empresa alvo é obrigatória"),
  cvPayload: z.record(z.string(), z.any()),
});

export class CreateHistoryDto extends createZodDto(CreateHistorySchema) {}
