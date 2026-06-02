import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateExperienceDto } from "./dto/create-experience.dto";
import { UpdateExperienceDto } from "./dto/update-experience.dto";

@Injectable()
export class ExperienceService {
  constructor(private readonly prisma: PrismaService) {}

  // Criar nova experiência
  async create(dto: CreateExperienceDto) {
    return this.prisma.experience.create({
      // Como mapeamos url de forma opcional/null no Zod, normalizamos para salvar vazio no banco se não vier nada
      data: {
        ...dto,
        url: dto.url ?? "",
        date: dto.date ?? "",
      },
    });
  }

  // Listar todas as experiências, filtrando opcionalmente pelo idioma da UI
  async findAll(language?: string) {
    return this.prisma.experience.findMany({
      where: language ? { language } : undefined,
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  // Atualizar experiência existente por ID (Edição)
  async update(id: string, dto: UpdateExperienceDto) {
    const experience = await this.prisma.experience.findUnique({
      where: { id },
    });

    if (!experience) {
      throw new NotFoundException("Experiência não encontrada");
    }

    // Limpa eventuais undefined do dto antes de atualizar
    const cleanDto = Object.fromEntries(
      Object.entries(dto).filter(([_, v]) => v !== undefined),
    );

    return this.prisma.experience.update({
      where: { id },
      data: cleanDto,
    });
  }

  // Excluir experiência existente por ID
  async remove(id: string) {
    const experience = await this.prisma.experience.findUnique({
      where: { id },
    });

    if (!experience) {
      throw new NotFoundException("Experiência não encontrada");
    }

    await this.prisma.experience.delete({
      where: { id },
    });

    return { success: true };
  }
}
