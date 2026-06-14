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

  const frontendUrl = process.env.FRONTEND_URL || "http://localhost:3000";

  app.enableCors({
    origin: frontendUrl,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    credentials: true,
  });

  app.useGlobalPipes(new ZodValidationPipe());

  const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3001;

  await app.listen(port, "0.0.0.0");
  console.log(`🚀 Backend running on port ${port} with Fastify`);
}
bootstrap();
