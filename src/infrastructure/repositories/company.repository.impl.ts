import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CompanyRepository } from '../../domain/repositories/company.repository';
import { Company } from '../entities/company.entity';

@Injectable()
export class CompanyRepositoryImpl implements CompanyRepository {
  constructor(@InjectRepository(Company) private companyRepository: Repository<Company>) {}

  async findOneByName(name: string): Promise<Company | null> {
    const company = await this.companyRepository.findOne({ where: { name } });
    return company || null;
  }

  async findOneByEmail(email: string): Promise<Company | null> {
    const company = await this.companyRepository.findOne({ where: { email } });
    return company || null;
  }

  async save(company: Company): Promise<Company> {
    const newCompany = this.companyRepository.create(company);
    await this.companyRepository.save(newCompany);

    return newCompany;
  }
}
