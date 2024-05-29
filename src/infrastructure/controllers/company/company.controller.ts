import { Body, Controller, Inject, Post } from '@nestjs/common';
import { UsecasesProxyModule } from '../../usecases-proxy/usecases-proxy.module';
import { UseCaseProxy } from '../../usecases-proxy/usecases-proxy';
import { CreateCompanyUsecase } from '../../../application/use-cases/create-company.usecase';
import { CreateCompanyDto } from './company.dto';

@Controller('company')
export class CompanyController {
  constructor(
    @Inject(UsecasesProxyModule.CREATE_COMPANY_USECASES_PROXY)
    private createCompanyUsecaseProxy: UseCaseProxy<CreateCompanyUsecase>,
  ) {}

  @Post('create')
  async createCompany(@Body() createCompanyDto: CreateCompanyDto) {
    await this.createCompanyUsecaseProxy.getInstance().execute(createCompanyDto);
    return { message: 'Company created successfully' };
  }
}
