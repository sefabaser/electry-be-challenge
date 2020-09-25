import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app.module';
import { ContentTypeInterceptor } from 'src/content-type.interceptor';

async function bootstrap() {
  let app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true
    })
  );
  app.useGlobalInterceptors(new ContentTypeInterceptor());
  await app.listen(3000);
}
bootstrap();
