import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { ValidationException } from './common/exceptions/validation.exception';
import * as cookieParser from 'cookie-parser';
import { UnAuthExceptionFilter } from './common/filters/unauth-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        return new ValidationException(validationErrors);
      },
      whitelist: true,
      validationError: {
        target: true,
      },
    }),
  );
  app.useGlobalFilters(new UnAuthExceptionFilter());
  await app.listen(3000);
}
bootstrap();
