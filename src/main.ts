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

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3000;
  await app.listen(port, '0.0.0.0');
}
bootstrap();
