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
import { LoggerModule } from '../logger/logger.module';
import { LoggerService } from '../logger/logger.service';

@Module({
  imports: [RepositoriesModule, JwtModule, BcryptModule, LoggerModule],
})
export class UsecasesProxyModule {
  static REGISTER_USECASES_PROXY = 'RegisterUseCasesProxy';
  static AUTHENTICATE_USECASES_PROXY = 'LoginUseCasesProxy';

  static register(): DynamicModule {
    return {
      module: UsecasesProxyModule,
      providers: [
        {
          inject: [UserRepositoryImpl, BcryptService, LoggerService],
          provide: UsecasesProxyModule.REGISTER_USECASES_PROXY,
          useFactory: (
            userRepo: UserRepositoryImpl,
            bcryptService: BcryptService,
            logger: LoggerService,
          ) =>
            new UseCaseProxy(
              new RegisterUserUseCase(userRepo, bcryptService, logger),
            ),
        },
        {
          inject: [
            UserRepositoryImpl,
            JwtTokenService,
            BcryptService,
            LoggerService,
          ],
          provide: UsecasesProxyModule.AUTHENTICATE_USECASES_PROXY,
          useFactory: (
            userRepo: UserRepositoryImpl,
            jwtTokenService: JwtTokenService,
            bcryptService: BcryptService,
            logger: LoggerService,
          ) =>
            new UseCaseProxy(
              new AuthenticateUserUseCase(
                userRepo,
                jwtTokenService,
                bcryptService,
                logger,
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
