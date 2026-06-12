import { createZodDto } from "nestjs-zod";
import { z } from "zod";

export const CreateExperienceSchema = z.object({
  language: z.enum(["pt", "en"], {
    message: "Language is required ('pt' or 'en')",
  }),
  role: z.string().min(1, "Role is required"),
  company: z.string().min(1, "Company is required"),
  // Optional fields representing URLs or dates; empty or null values are accepted
  url: z.string().optional().nullable(),
  date: z.string().optional(),
  // Arrays defaulting to empty arrays if not provided
  details: z.array(z.string()).default([]),
  stacks: z.array(z.string()).default([]),
});

export class CreateExperienceDto extends createZodDto(CreateExperienceSchema) {}
