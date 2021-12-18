import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';
import compression from 'fastify-compress';
import { AppModule } from './app.module';

import LoggingInterceptor from './common/interceptors/logging.interceptor';
import TimeoutInterceptor from './common/interceptors/timeout.interceptor';
import HttpExceptionFilter from './common/filters/http-exception.filter';
import InitSwagger from './bootstrap/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      logger: true,
    }),
    {
      logger: ['log', 'error', 'warn', 'debug'],
    },
  );

  await app.register(compression);
  const configService = app.get(ConfigService);

  InitSwagger(app, configService);

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new LoggingInterceptor(), new TimeoutInterceptor(configService));

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  await app.listen(configService.get('PORT'), configService.get('HOST'));
}
// eslint-disable-next-line no-console
bootstrap().catch(console.log);
