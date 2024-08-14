/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

async function bootstrap() {
  const allowlist = ['http://localhost:4200', 'http://localhost:8001', 'http://localhost:8000', 'http://tobanas220', 'http://localhost:8080', 'http://localhost:8090'];
  const corsOptionsDelegate = (req: { header: (arg0: string) => string; }, callback: (arg0: null, arg1: { origin: boolean; }) => void) => {
    let corsOptions;
    if (allowlist.indexOf(req.header('Origin')) !== -1) {
      corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
    } else {
      corsOptions = { origin: false }; // disable CORS for this request
    }
    callback(null, corsOptions); // callback expects two parameters: error and options
  };

  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.enableCors(corsOptionsDelegate as CorsOptions );
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 8081;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
