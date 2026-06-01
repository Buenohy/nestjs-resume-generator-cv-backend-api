import { createZodDto } from "nestjs-zod";
import { CreateExperienceSchema } from "./create-experience.dto";

// O .partial() do Zod faz todos os campos do CreateSchema se tornarem opcionais para a Edição (PATCH)
export const UpdateExperienceSchema = CreateExperienceSchema.partial();

export class UpdateExperienceDto extends createZodDto(UpdateExperienceSchema) {}
