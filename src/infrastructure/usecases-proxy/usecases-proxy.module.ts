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
import { CompanyRepositoryImpl } from '../repositories/company.repository.impl';
import { CompanyFactory } from '../../application/factory/company.factory';
import { CreateCompanyUsecase } from '../../application/use-cases/create-company.usecase';
import { ApplicationModule } from '../../application/application.module';
import { EmailModule } from '../services/email/mailer.module';
import { EmailService } from '../services/email/mailer.service';
import { UserFactory } from '../../application/factory/user.factory';
import { EmailVerificationRepositoryImpl } from '../repositories/email-verification.impl';
import { SendVerificationEmailUsecase } from '../../application/use-cases/send-verification-email.usecase';
import { VerifyEmailCodeUsecase } from '../../application/use-cases/verify-email-code.usecase';

@Module({
  imports: [RepositoriesModule, ApplicationModule, JwtModule, BcryptModule, EmailModule, LoggerModule],
})
export class UsecasesProxyModule {
  static REGISTER_USER_USECASES_PROXY = 'RegisterUseCasesProxy';
  static AUTHENTICATE_USER_USECASES_PROXY = 'AuthenticateUseCasesProxy';
  static CREATE_COMPANY_USECASES_PROXY = 'CreateCompanyUseCasesProxy';
  static SEND_VERIFICATION_EMAIL_USECASES_PROXY = 'SendVerificationEmailUseCasesProxy';
  static VERIFY_EMAIL_CODE_USECASES_PROXY = 'VerifyEmailCodeUseCasesProxy';

  static register(): DynamicModule {
    return {
      module: UsecasesProxyModule,
      providers: [
        {
          inject: [UserRepositoryImpl, UserFactory, BcryptService, EmailService, LoggerService],
          provide: UsecasesProxyModule.REGISTER_USER_USECASES_PROXY,
          useFactory: (
            userRepo: UserRepositoryImpl,
            userFactory: UserFactory,
            bcryptService: BcryptService,
            emailService: EmailService,
            logger: LoggerService,
          ) => new UseCaseProxy(new RegisterUserUseCase(userRepo, userFactory, bcryptService, emailService, logger)),
        },
        {
          inject: [UserRepositoryImpl, JwtTokenService, BcryptService, LoggerService],
          provide: UsecasesProxyModule.AUTHENTICATE_USER_USECASES_PROXY,
          useFactory: (
            userRepo: UserRepositoryImpl,
            jwtTokenService: JwtTokenService,
            bcryptService: BcryptService,
            logger: LoggerService,
          ) => new UseCaseProxy(new AuthenticateUserUseCase(userRepo, jwtTokenService, bcryptService, logger)),
        },
        {
          inject: [CompanyRepositoryImpl, CompanyFactory, LoggerService],
          provide: UsecasesProxyModule.CREATE_COMPANY_USECASES_PROXY,
          useFactory: (companyRepo: CompanyRepositoryImpl, companyFactory: CompanyFactory, logger: LoggerService) =>
            new UseCaseProxy(new CreateCompanyUsecase(companyRepo, companyFactory, logger)),
        },
        {
          inject: [EmailVerificationRepositoryImpl, UserRepositoryImpl, EmailService, LoggerService],
          provide: UsecasesProxyModule.SEND_VERIFICATION_EMAIL_USECASES_PROXY,
          useFactory: (
            emailVerificationRepo: EmailVerificationRepositoryImpl,
            userRepo: UserRepositoryImpl,
            emailService: EmailService,
            logger: LoggerService,
          ) => new UseCaseProxy(new SendVerificationEmailUsecase(emailVerificationRepo, userRepo, emailService, logger)),
        },
        {
          inject: [EmailVerificationRepositoryImpl, LoggerService],
          provide: UsecasesProxyModule.VERIFY_EMAIL_CODE_USECASES_PROXY,
          useFactory: (emailVerificationRepo: EmailVerificationRepositoryImpl, logger: LoggerService) =>
            new UseCaseProxy(new VerifyEmailCodeUsecase(emailVerificationRepo, logger)),
        },
      ],

      exports: [
        UsecasesProxyModule.REGISTER_USER_USECASES_PROXY,
        UsecasesProxyModule.AUTHENTICATE_USER_USECASES_PROXY,
        UsecasesProxyModule.CREATE_COMPANY_USECASES_PROXY,
        UsecasesProxyModule.SEND_VERIFICATION_EMAIL_USECASES_PROXY,
        UsecasesProxyModule.VERIFY_EMAIL_CODE_USECASES_PROXY,
      ],
    };
  }
}
