import { Injectable } from '@nestjs/common';
import { CompanyCommand } from '../commands/company.command';
import { Company } from '../../domain/entities/company.entity';

@Injectable()
export class CompanyFactory {
  public createCompany(companyCommand: CompanyCommand): Company {
    return new Company(
      null,
      companyCommand.name,
      companyCommand.address,
      companyCommand.city,
      companyCommand.country,
      companyCommand.email,
      companyCommand.phone,
      companyCommand.website,
    );
  }
}
