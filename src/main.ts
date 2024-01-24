import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT || 9000;

  app.setGlobalPrefix('api');

  app.enableCors({
    origin: '*',
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(PORT);

  console.log('🚀 Server running on port ', PORT);
}
bootstrap();
