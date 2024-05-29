import { Body, Controller, Post } from '@nestjs/common';
import { CreateCompanyDto } from '../company/company.dto';
import { TestDto } from './test.dto';

@Controller('test')
export class TestController {
  @Post('test')
  async test(@Body() createCompanyDto: CreateCompanyDto) {
    console.log(createCompanyDto);
    return { message: 'Test' };
  }
}
