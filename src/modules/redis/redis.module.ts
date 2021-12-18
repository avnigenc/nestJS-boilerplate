import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RedisModule } from 'nestjs-redis';
import RedisClientService from './redis.service';

@Global()
@Module({
  imports: [
    ConfigModule,
    RedisModule.forRootAsync({
      useFactory: (configService: ConfigService) => configService.get('REDIS_URL'),
      inject: [ConfigService],
    }),
  ],
  providers: [RedisClientService],
})
export default class RedisClientModule {}
