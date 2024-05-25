import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from './user.module';
import { RegisterUserUseCase } from '../../application/use-cases/register-user.usecase';
import { AuthenticateUserUseCase } from '../../application/use-cases/authenticate-user.usecase';
import { AuthController } from '../controllers/auth.controller';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'secretKey',
      signOptions: { expiresIn: '60s' },
    }),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [RegisterUserUseCase, AuthenticateUserUseCase],
  exports: [RegisterUserUseCase, AuthenticateUserUseCase],
})
export class AuthModule {}
