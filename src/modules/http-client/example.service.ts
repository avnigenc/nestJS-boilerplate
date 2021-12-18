import { Injectable } from '@nestjs/common';
import HttpClientService from './http-client.service';
import CONSTANTS from '../../common/constants/application';
import { IExample } from '../../domains/example/dto/example.interface';

@Injectable()
export default class ExampleServiceCaller extends HttpClientService {
  async getAllExamplesSC(): Promise<IExample[]> {
    return this.request(
      CONSTANTS.SERVICES.JSON_PLACE_HOLDER,
      'GET',
      'todos',
    );
  }

  async getExampleByIdSC(exampleId: number): Promise<IExample> {
    return this.request(
      CONSTANTS.SERVICES.JSON_PLACE_HOLDER,
      'GET',
      `todos/${exampleId}`,
    );
  }
}
