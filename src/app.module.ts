import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { RouterModule } from 'nest-router';
import { JwtModule } from '@nestjs/jwt';
import { TerminusModule } from '@nestjs/terminus';
import { AppController } from './app.controller';
import configuration from './config';
import ROUTES from './routes';
import { PublicGuard } from './common/guards/public.guards';
import { RoleGuard } from './common/guards/roles.guards';
import MongoModule from './modules/mongo/mongo.module';
import RedisClientModule from './modules/redis/redis.module';
import DomainsModule from './domains/domains.module';

@Module({
  imports: [
    RouterModule.forRoutes(ROUTES),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
      }),
      inject: [ConfigService],
    }),
    TerminusModule,
    RedisClientModule,
    MongoModule,
    DomainsModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: PublicGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
  ],
})
export class AppModule {}
