import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
  await app.listen(process.env.PORT ?? 3001);
  console.log(`🚀 Server running on http://localhost:3001`);
}
bootstrap();
