// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from './user.module';
import { AuthenticateUserUseCase } from '../../application/use-cases/authenticate-user.usecase';
import { RegisterUserUseCase } from '../../application/use-cases/register-user.usecase';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'secretKey',
      signOptions: { expiresIn: '60s' },
    }),
    UserModule,
  ],
  providers: [RegisterUserUseCase, AuthenticateUserUseCase],
  exports: [RegisterUserUseCase, AuthenticateUserUseCase],
})
export class AuthModule {}
