import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './infrastructure/database/entities/user.entity';
import { UsecasesProxyModule } from './infrastructure/usecases-proxy/usecases-proxy.module';
import { ControllersModule } from './infrastructure/controllers/controllers.module';
import { MiddlewareModule } from '@nestjs/core/middleware/middleware-module';
import { LoggerModule } from './infrastructure/logger/logger.module';

@Module({
  imports: [
    UsecasesProxyModule.register(),
    ControllersModule,
    MiddlewareModule,
    LoggerModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'src/infrastructure/database/database.sqlite',
      entities: [User],
      synchronize: true,
    }),
  ],
})
export class AppModule {}
