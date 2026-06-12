import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateHistoryDto } from "./dto/create-history.dto";
import { Prisma } from "@prisma/client";

@Injectable()
export class HistoryService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateHistoryDto) {
    return this.prisma.resumeHistory.create({
      data: {
        targetRole: dto.targetRole,
        targetCompany: dto.targetCompany,
        // Explicit typecast to support Prisma's native JSON input format safely
        cvPayload: dto.cvPayload as Prisma.InputJsonValue,
      },
    });
  }

  async findAll() {
    return this.prisma.resumeHistory.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  }
}
