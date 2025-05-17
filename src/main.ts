import 'dotenv/config';
import { randomUUID, randomBytes } from 'crypto';

if (typeof globalThis.crypto === 'undefined') {
  Object.assign(globalThis, {
    crypto: {
      randomUUID,
      getRandomValues: (buf: Uint8Array) => buf.set(randomBytes(buf.length)),
    },
  });
}

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );

  const config = new DocumentBuilder()
    .setTitle('Weather Forecast API')
    .setVersion('1.0.0')
    .setDescription(
      'Weather API application that allows users to subscribe to weather updates for their city',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config, {
    deepScanRoutes: true,
    ignoreGlobalPrefix: true,
  });

  SwaggerModule.setup('api/doc', app, document);
  
  const port = process.env.PORT || 3000;
  await app.listen(port);
}
bootstrap();