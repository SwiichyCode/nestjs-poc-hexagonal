import { CompanyRepository } from '../../domain/repositories/company.repository';
import { ILogger } from '../../domain/logger/logger.interface';
import { CompanyCommand } from '../commands/company.command';
import { Company } from '../../domain/entities/company.entity';
import { UnauthorizedException } from '@nestjs/common';
import { CompanyFactory } from '../factory/company.factory';

export class CreateCompanyUsecase {
  constructor(
    private readonly companyRepository: CompanyRepository,
    private readonly companyFactory: CompanyFactory,
    private readonly logger: ILogger,
  ) {}

  async execute(companyCommand: CompanyCommand): Promise<Company> {
    const existingCompany = await this.companyRepository.findOneByEmail(companyCommand.email);

    if (existingCompany) {
      this.logger.log('CreateCompanyUsecase', `Company with email ${companyCommand.email} already exists`);
      throw new UnauthorizedException('Company already exists');
    }

    const company = this.companyFactory.createCompany(companyCommand);

    const payload = await this.companyRepository.save(company);

    this.logger.log('CreateCompanyUsecase', `Company ${company.email} registered successfully`);

    return payload;
  }
}
