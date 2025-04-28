import { Module } from '@nestjs/common';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';
import { UserRepository } from './repository/user.repository';

@Module({
  controllers: [CustomerController],
  providers: [CustomerService, UserRepository],
  exports: [CustomerService, UserRepository],
})
export class UserModule {}
