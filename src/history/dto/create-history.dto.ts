import { createZodDto } from "nestjs-zod";
import { z } from "zod";

export const CreateHistorySchema = z.object({
  targetRole: z.string().min(1, "Target role is required"),
  targetCompany: z.string().min(1, "Target company is required"),
  cvPayload: z.record(z.string(), z.unknown()),
});

export class CreateHistoryDto extends createZodDto(CreateHistorySchema) {}
