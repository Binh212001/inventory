import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExceptionsFilter } from './exception/exceptions-filter';
import {
  ClassSerializerInterceptor,
  HttpStatus,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { ValidationPipe } from './exception/validation-pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const reflector = app.get(Reflector);
  app.enableCors({
    origin: [
      'http://localhost:3001',
      'http://example.com',
      'http://www.example.com',
      'http://app.example.com',
      'https://example.com',
      'https://www.example.com',
      'https://app.example.com',
    ],
    methods: ['GET', 'POST'],
    credentials: true,
  });
  app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector, {}));
  app.useGlobalPipes(new ValidationPipe());

  app.useGlobalFilters(new ExceptionsFilter());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
