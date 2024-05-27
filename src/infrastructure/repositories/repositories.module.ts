import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { UserRepositoryImpl } from './user.repository.impl';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserRepositoryImpl],
  exports: [UserRepositoryImpl],
})
export class RepositoriesModule {}
