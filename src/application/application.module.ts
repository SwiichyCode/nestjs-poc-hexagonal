import { Module } from '@nestjs/common';
import { CompanyFactory } from './factory/company.factory';
import { UserFactory } from './factory/user.factory';

@Module({
  providers: [CompanyFactory, UserFactory],
  exports: [CompanyFactory, UserFactory],
})
export class ApplicationModule {}
