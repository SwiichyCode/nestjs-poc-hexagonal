import { Company } from '../entities/company.entity';

export interface CompanyRepository {
  findOneByName(name: string): Promise<Company | null>;
  findOneByEmail(email: string): Promise<Company | null>;
  save(company: Company): Promise<Company>;
}
