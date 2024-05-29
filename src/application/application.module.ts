import { Module } from '@nestjs/common';
import { CompanyFactory } from './factory/company.factory';

@Module({
  providers: [CompanyFactory],
  exports: [CompanyFactory],
})
export class ApplicationModule {}
