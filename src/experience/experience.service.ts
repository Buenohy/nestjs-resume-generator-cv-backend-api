import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateExperienceDto } from "./dto/create-experience.dto";
import { UpdateExperienceDto } from "./dto/update-experience.dto";

@Injectable()
export class ExperienceService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateExperienceDto) {
    return this.prisma.experience.create({
      data: {
        ...dto,
        // Fallback for null/optional fields to prevent database constraint issues
        url: dto.url ?? "",
        date: dto.date ?? "",
      },
    });
  }

  async findAll(language?: string) {
    return this.prisma.experience.findMany({
      where: language ? { language } : undefined,
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async update(id: string, dto: UpdateExperienceDto) {
    const experience = await this.prisma.experience.findUnique({
      where: { id },
    });

    if (!experience) {
      throw new NotFoundException("Experience not found");
    }

    // Filter out undefined payload properties to prevent overriding db values with undefined
    const cleanDto = Object.fromEntries(
      Object.entries(dto).filter(([_, value]) => value !== undefined),
    );

    return this.prisma.experience.update({
      where: { id },
      data: cleanDto,
    });
  }

  async remove(id: string) {
    const experience = await this.prisma.experience.findUnique({
      where: { id },
    });

    if (!experience) {
      throw new NotFoundException("Experience not found");
    }

    await this.prisma.experience.delete({
      where: { id },
    });

    return { success: true };
  }
}
