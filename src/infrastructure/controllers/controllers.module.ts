import { Module } from '@nestjs/common';
import { UsecasesProxyModule } from '../usecases-proxy/usecases-proxy.module';
import { JwtModule as JwtServiceModule } from '../services/jwt/jwt.module';
import { AuthController } from './auth/auth.controller';
import { CompanyController } from './company/company.controller';
import { TestController } from './test/test.controller';

@Module({
  imports: [UsecasesProxyModule.register(), JwtServiceModule],
  controllers: [AuthController, CompanyController, TestController],
})
export class ControllersModule {}
