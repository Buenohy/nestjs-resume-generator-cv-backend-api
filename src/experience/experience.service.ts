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
      data: dto,
    });
  }

  // Listar todas as experiências (Ordenadas das mais novas para as mais antigas)
  async findAll() {
    return this.prisma.experience.findMany({
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

    return this.prisma.experience.update({
      where: { id },
      data: dto,
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
