import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Example, ExampleDocument } from './schemas/example.schema';

@Injectable()
export default class ExampleDataAccess {
  constructor(
    @InjectModel(Example.name) private exampleModel: Model<ExampleDocument>,
  ) {}

  async getById(exampleId: Types.ObjectId): Promise<ExampleDocument | undefined> {
    return this.exampleModel.findById(exampleId).exec();
  }

  async create(example: Partial<Example>): Promise<ExampleDocument> {
    return this.exampleModel.create(example);
  }
}
