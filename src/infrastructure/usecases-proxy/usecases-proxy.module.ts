import { DynamicModule, Module } from '@nestjs/common';
import { RepositoriesModule } from '../repositories/repositories.module';
import { UserRepositoryImpl } from '../repositories/user.repository.impl';
import { UseCaseProxy } from './usecases-proxy';
import { RegisterUserUseCase } from '../../application/use-cases/register-user.usecase';
import { AuthenticateUserUseCase } from '../../application/use-cases/authenticate-user.usecase';
import { JwtTokenService } from '../services/jwt/jwt.service';
import { JwtModule } from '../services/jwt/jwt.module';
import { BcryptModule } from '../services/bcrypt/bcrypt.module';
import { BcryptService } from '../services/bcrypt/bcrypt.service';

@Module({
  imports: [RepositoriesModule, JwtModule, BcryptModule],
})
export class UsecasesProxyModule {
  static REGISTER_USECASES_PROXY = 'RegisterUseCasesProxy';
  static AUTHENTICATE_USECASES_PROXY = 'LoginUseCasesProxy';

  static register(): DynamicModule {
    return {
      module: UsecasesProxyModule,
      providers: [
        {
          inject: [UserRepositoryImpl, BcryptService],
          provide: UsecasesProxyModule.REGISTER_USECASES_PROXY,
          useFactory: (
            userRepo: UserRepositoryImpl,
            bcryptService: BcryptService,
          ) =>
            new UseCaseProxy(new RegisterUserUseCase(userRepo, bcryptService)),
        },
        {
          inject: [UserRepositoryImpl, JwtTokenService, BcryptService],
          provide: UsecasesProxyModule.AUTHENTICATE_USECASES_PROXY,
          useFactory: (
            userRepo: UserRepositoryImpl,
            jwtTokenService: JwtTokenService,
            bcryptService: BcryptService,
          ) =>
            new UseCaseProxy(
              new AuthenticateUserUseCase(
                userRepo,
                jwtTokenService,
                bcryptService,
              ),
            ),
        },
      ],

      exports: [
        UsecasesProxyModule.REGISTER_USECASES_PROXY,
        UsecasesProxyModule.AUTHENTICATE_USECASES_PROXY,
      ],
    };
  }
}
