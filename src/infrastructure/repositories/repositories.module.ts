import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Company } from '../entities/company.entity';
import { EmailVerification } from '../entities/email-verification.entity';
import { UserRepositoryImpl } from './user.repository.impl';
import { CompanyRepositoryImpl } from './company.repository.impl';

import { EmailVerificationRepositoryImpl } from './email-verification.impl';

@Module({
  imports: [TypeOrmModule.forFeature([User, Company, EmailVerification])],
  providers: [UserRepositoryImpl, CompanyRepositoryImpl, EmailVerificationRepositoryImpl],
  exports: [UserRepositoryImpl, CompanyRepositoryImpl, EmailVerificationRepositoryImpl],
})
export class RepositoriesModule {}
