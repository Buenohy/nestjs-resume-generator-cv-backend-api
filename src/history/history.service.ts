import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateHistoryDto } from "./dto/create-history.dto";
import { Prisma } from "@prisma/client";

@Injectable()
export class HistoryService {
  constructor(private readonly prisma: PrismaService) {}

  // Salva um novo snapshot de currículo no banco de dados
  async create(dto: CreateHistoryDto) {
    return this.prisma.resumeHistory.create({
      data: {
        targetRole: dto.targetRole,
        targetCompany: dto.targetCompany,
        // CORRIGIDO: Typecast seguro para a tipagem de entrada JSON do Prisma v7
        cvPayload: dto.cvPayload as Prisma.InputJsonValue,
      },
    });
  }

  // Lista todos os históricos ordenados do mais recente para o mais antigo
  async findAll() {
    return this.prisma.resumeHistory.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  }
}
