import { MongooseModuleOptions, MongooseOptionsFactory } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import * as mongoose from 'mongoose';
import { ConfigService } from '@nestjs/config';

@Injectable()
class MongoService implements MongooseOptionsFactory {
  constructor(private configService: ConfigService) { }

  createMongooseOptions():
  | Promise<MongooseModuleOptions>
  | MongooseModuleOptions {
    mongoose.plugin(this.addUpdateOptionNew);
    mongoose.plugin(this.addUpdatedAt);
    return {
      uri: this.configService.get('EXAMPLE_DB'),
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    };
  }

  // eslint-disable-next-line
  addUpdateOptionNew(schema) {
    schema.pre(
      'findOneAndUpdate',
      function addUpdateOptionNewPreFindOneAndUpdate(next) {
        if (this.options.new === undefined) {
          this.findOneAndUpdate({}, {}, { new: true });
        }
        next();
      },
    );
  }

  // eslint-disable-next-line
  addUpdatedAt(schema) {
    schema.pre('findOneAndUpdate', function addUpdatedAtPreFindOneAndUpdate(
      next,
    ) {
      this.findOneAndUpdate({}, { $set: { updatedAt: new Date() } });
      next();
    });

    schema.pre('update', function addUpdatedAtPreUpdate(next) {
      this.update({}, { $set: { updatedAt: new Date() } });
      next();
    });
  }
}

export default MongoService;
