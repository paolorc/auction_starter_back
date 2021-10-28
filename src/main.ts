import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { fastifyCookie } from 'fastify-cookie';
import fastifyCsrf from 'fastify-csrf';
import { fastifyHelmet } from 'fastify-helmet';

import { HttpExceptionFilter } from 'lib/exceptionFilter';

import AppModule from './app.module';
import Logger from 'logger/logger.service';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  // security
  await app.register(fastifyCookie);
  await app.register(fastifyCsrf);
  await app.register(fastifyHelmet);
  app.enableCors();

  const configService: ConfigService = app.get(ConfigService);

  app.useLogger(await app.resolve(Logger));
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.setGlobalPrefix(configService.get<string>('http.prefix'));
  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(
    configService.get<number>('http.port'),
    configService.get<string>('http.host'),
  );
  Logger.debug(`Application running on: ${await app.getUrl()}`);
}
bootstrap();
