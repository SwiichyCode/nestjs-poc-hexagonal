import { Module } from '@nestjs/common';
import { AppController } from './infrastructure/controllers/app.controller';
import { AuthController } from './infrastructure/controllers/auth.controller';
import { AppService } from './app.service';
import { ApplicationModule } from './application/application.module';
import { InfrastructureModule } from './infrastructure/infrastructure.module';

@Module({
  imports: [ApplicationModule, InfrastructureModule],
  controllers: [AppController, AuthController],
  providers: [AppService],
})
export class AppModule {}
