import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import * as autoPopulate from 'mongoose-autopopulate';
import { HttpClientModule } from '../../modules/http-client/http-client.module';
import { Example, ExampleSchema } from './schemas/example.schema';

import ExampleController from './example.controller';
import ExampleService from './example.service';
import ExampleLogic from './example.logic';
import ExampleDataAccess from './example-data-access.service';

@Module({
  imports: [
    HttpClientModule,
    MongooseModule.forFeatureAsync([
      {
        name: Example.name,
        useFactory: () => {
          const schema = ExampleSchema;
          schema.plugin(autoPopulate);
          return schema;
        },
      },
    ]),
  ],
  controllers: [ExampleController],
  providers: [ExampleService, ExampleLogic, ExampleDataAccess],
})
export default class ExampleModule { }
