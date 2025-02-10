import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Global validation pipes
  app.useGlobalPipes(new ValidationPipe({
    // ensures that any properties that are not explicitly
    //  defined in the DTO will be automatically stripped
    //  from the incoming request. This helps to prevent
    //  unwanted or malicious data from being processed by
    //  your application.
    whitelist: true,
    // Throws an exception when an unknown key is encountered (bad request)
    forbidNonWhitelisted: true,
    transform: true
  }));


  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
