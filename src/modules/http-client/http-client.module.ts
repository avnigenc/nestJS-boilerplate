import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';

import HttpClientService from './http-client.service';
import ExampleServiceCaller from './example.service';

@Module({
  imports: [
    HttpModule,
    ConfigModule,
  ],
  providers: [
    HttpClientService,
    ExampleServiceCaller,
  ],
  exports: [
    ExampleServiceCaller,
  ],
})
export class HttpClientModule { }
