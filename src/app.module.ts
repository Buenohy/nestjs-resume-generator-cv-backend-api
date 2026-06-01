import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ExperienceModule } from "./experience/experience.module";
import { PrismaModule } from "./prisma/prisma.module";
import { HistoryModule } from './history/history.module';

@Module({
  imports: [ExperienceModule, PrismaModule, HistoryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
