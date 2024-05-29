import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './infrastructure/entities/user.entity';
import { UsecasesProxyModule } from './infrastructure/usecases-proxy/usecases-proxy.module';
import { ControllersModule } from './infrastructure/controllers/controllers.module';
import { MiddlewareModule } from '@nestjs/core/middleware/middleware-module';
import { LoggerModule } from './infrastructure/logger/logger.module';
import { EnvironmentConfigModule } from './infrastructure/config/environment-config/environment-config.module';
import { Company } from './infrastructure/entities/company.entity';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { TypedEventEmitterModule } from './infrastructure/common/event-emitter/typed-event-emitter.module';

@Module({
  imports: [
    UsecasesProxyModule.register(),
    ControllersModule,
    MiddlewareModule,
    LoggerModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database/database.sqlite',
      entities: [User, Company],
      synchronize: true,
    }),
    EventEmitterModule.forRoot(),
    TypedEventEmitterModule,
    EnvironmentConfigModule,
  ],
})
export class AppModule {}
