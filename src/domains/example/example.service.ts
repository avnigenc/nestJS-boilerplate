import { Inject, Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { plainToClass } from 'class-transformer';
import { Example, ExampleDocument } from './schemas/example.schema';
import ExampleLogic from './example.logic';
import { ExampleNotFoundException } from '../../common/errors';
import JsonServiceCaller from '../../modules/http-client/example.service';
import { IExample } from './dto/example.interface';
import ExampleDataAccess from './example-data-access.service';
import { CreateExampleDto } from './dto/request';

@Injectable()
export default class ExampleService {
  constructor(
    @Inject(ExampleLogic) private exampleLogic: ExampleLogic,
    private readonly jsonServiceCaller: JsonServiceCaller,
    private readonly exampleDataAccess: ExampleDataAccess,
  ) { }

  async createExampleService(createExampleDto: CreateExampleDto): Promise<boolean> {
    const example: Example = plainToClass(Example, createExampleDto);
    console.log(example);
    await this.exampleDataAccess.create(example);
    return true;
  }

  async getExampleByIdFromDBService(exampleId: Types.ObjectId): Promise<ExampleDocument> {
    const example = await this.exampleDataAccess.getById(exampleId);
    if (!example) throw new ExampleNotFoundException();
    return example;
  }

  async getAllExamplesService(): Promise<IExample[]> {
    return this.jsonServiceCaller.getAllExamplesSC();
  }

  async getExampleByIdService(exampleId: number): Promise<IExample> {
    return this.jsonServiceCaller.getExampleByIdSC(exampleId);
  }
}
