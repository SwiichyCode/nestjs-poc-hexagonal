import { DynamicModule, Module } from '@nestjs/common';
import { RepositoriesModule } from '../repositories/repositories.module';
import { UserRepositoryImpl } from '../repositories/user.repository.impl';
import { UseCaseProxy } from './usecases-proxy';
import { RegisterUserUseCase } from '../../application/use-cases/register-user.usecase';
import { AuthenticateUserUseCase } from '../../application/use-cases/authenticate-user.usecase';
import { JwtTokenService } from '../services/jwt/jwt.service';
import { JwtModule } from '../services/jwt/jwt.module';

@Module({
  imports: [RepositoriesModule, JwtModule],
})
export class UsecasesProxyModule {
  static REGISTER_USECASES_PROXY = 'RegisterUseCasesProxy';
  static AUTHENTICATE_USECASES_PROXY = 'LoginUseCasesProxy';

  static register(): DynamicModule {
    return {
      module: UsecasesProxyModule,
      providers: [
        {
          inject: [UserRepositoryImpl],
          provide: UsecasesProxyModule.REGISTER_USECASES_PROXY,
          useFactory: (userRepo: UserRepositoryImpl) =>
            new UseCaseProxy(new RegisterUserUseCase(userRepo)),
        },
        {
          inject: [UserRepositoryImpl, JwtTokenService],
          provide: UsecasesProxyModule.AUTHENTICATE_USECASES_PROXY,
          useFactory: (
            userRepo: UserRepositoryImpl,
            jwtTokenService: JwtTokenService,
          ) =>
            new UseCaseProxy(
              new AuthenticateUserUseCase(userRepo, jwtTokenService),
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
