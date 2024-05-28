import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../common/guards/auth.guard';

@Controller('challenges')
export class ChallengesController {
  constructor() {}

  @Get('all')
  @UseGuards(AuthGuard)
  async getAllChallenges() {
    return { message: 'All challenges' };
  }
}
