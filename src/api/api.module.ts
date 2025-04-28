import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { UserModule } from './user/customer.module';
import { QuotationModule } from './quotation/quotation.module';

@Module({
  imports: [ProductModule, UserModule, QuotationModule],
})
export class ApiModule {}
