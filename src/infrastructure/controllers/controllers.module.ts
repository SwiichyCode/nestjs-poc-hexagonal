import { Module } from '@nestjs/common';
import { UsecasesProxyModule } from '../usecases-proxy/usecases-proxy.module';
import { AuthController } from './auth/auth.controller';
import { JwtModule as JwtServiceModule } from '../services/jwt/jwt.module';
import { ChallengesController } from './challenges/challenges.controller';

@Module({
  imports: [UsecasesProxyModule.register(), JwtServiceModule],
  controllers: [AuthController, ChallengesController],
})
export class ControllersModule {}
