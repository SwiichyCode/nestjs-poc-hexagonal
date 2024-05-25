// src/user/user.module.ts
import { Module } from '@nestjs/common';
import { UserRepositoryImpl } from '../repositories/user.repository.impl';

@Module({
  providers: [{ provide: 'UserRepository', useClass: UserRepositoryImpl }],
  exports: [{ provide: 'UserRepository', useClass: UserRepositoryImpl }],
})
export class UserModule {}
