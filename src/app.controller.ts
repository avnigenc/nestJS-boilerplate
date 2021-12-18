import { Controller, Get, Logger } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  HealthCheckService,
  HttpHealthIndicator,
  HealthCheck,
  MongooseHealthIndicator,
  MemoryHealthIndicator,
  MicroserviceHealthIndicator,
} from '@nestjs/terminus';
import { ConfigService } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';
import { Public } from './common/decorators/public.decorator';

@ApiTags('health')
@Controller()
export class AppController {
  private readonly logger: Logger = new Logger(AppController.name);

  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
    private configService: ConfigService,
    private mongoose: MongooseHealthIndicator,
    private memory: MemoryHealthIndicator,
    private microservice: MicroserviceHealthIndicator,
  ) {}

  @Public(true)
  @Get()
  index(): { service: string, time: number; status: string } {
    this.logger.log('Index called');
    return { service: this.configService.get<string>('NAME'), time: Date.now(), status: 'ok' };
  }

  @Public(true)
  @Get('health')
  getHealth(): { time: number; status: string } {
    return { time: Date.now(), status: 'ok' };
  }

  @Public(true)
  @Get('health/check')
  @HealthCheck()
  check() {
    return this.health.check([
      async () => this.mongoose.pingCheck('mongoose'),
      async () => this.memory.checkHeap('memory_heap', 200 * 1024 * 1024),
      async () => this.memory.checkRSS('memory_rss', 3000 * 1024 * 1024),
      async () => this.microservice.pingCheck(this.configService.get<string>('NAME'), {
        transport: Transport.TCP,
        options: {
          host: this.configService.get<string>('HOST'),
          port: this.configService.get<number>('PORT'),
        },
      }),
    ]);
  }
}
