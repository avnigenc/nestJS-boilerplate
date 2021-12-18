import { ConfigService } from '@nestjs/config';
import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Method } from 'axios';
import { GenericExternalServiceError } from '../../common/errors';

@Injectable()
export default class HttpClientService {
  constructor(
    private readonly configService: ConfigService,
    private httpService: HttpService,
  ) { }

  private readonly microserviceUrls = this.configService.get('EXTERNAL_SERVICE_URLS');

  private readonly logger = new Logger(HttpClientService.name);

  async request(
    microService: string,
    method: Method,
    path: string,
    data: Object = {},
    params: Object = {},
    headers: any = {} as Object,
    timeout: number = this.configService.get<number>('REQUEST_TIMEOUT'),
  ): Promise<any> {
    try {
      const log = {
        url: this.microserviceUrls[microService] + path,
        microService,
        path,
      };

      this.logger.log(`Http Caller: ${JSON.stringify(log)}`);
      const response = await this
        .httpService
        .request({
          method,
          data,
          params,
          timeout,
          url: this.microserviceUrls[microService] + path,
          headers,
        })
        .toPromise();

      return response.data;
    } catch (error) {
      this.logger.error({
        message: 'Unexpected Http Error',
        microService,
        method,
        path,
        data,
        params,
        headers,
        timeout,
        error,
      }, error, HttpClientService.name);

      throw new GenericExternalServiceError(microService, JSON.stringify(error));
    }
  }
}
