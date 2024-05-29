import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Company } from '../entities/company.entity';
import { UserRepositoryImpl } from './user.repository.impl';
import { CompanyRepositoryImpl } from './company.repository.impl';

@Module({
  imports: [TypeOrmModule.forFeature([User, Company])],
  providers: [UserRepositoryImpl, CompanyRepositoryImpl],
  exports: [UserRepositoryImpl, CompanyRepositoryImpl],
})
export class RepositoriesModule {}
