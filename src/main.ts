import { NestFactory } from "@nestjs/core";
import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify";
import { AppModule } from "./app.module";
import { ZodValidationPipe } from "nestjs-zod";

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  app.enableCors();

  app.useGlobalPipes(new ZodValidationPipe());

  await app.listen(3001, "0.0.0.0");
  console.log(`🚀 Backend rodando na porta 3001 com Fastify`);
}
bootstrap();
