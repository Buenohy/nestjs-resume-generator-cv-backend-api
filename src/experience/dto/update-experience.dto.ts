import { createZodDto } from "nestjs-zod";
import { CreateExperienceSchema } from "./create-experience.dto";

// Generates an optional schema representation of CreateExperienceSchema for PATCH requests
export const UpdateExperienceSchema = CreateExperienceSchema.partial();

export class UpdateExperienceDto extends createZodDto(UpdateExperienceSchema) {}
