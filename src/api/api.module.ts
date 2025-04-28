import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { CustomerModule } from './customer/customer.module';
import { QuotationModule } from './quotation/quotation.module';

@Module({
  imports: [ProductModule, CustomerModule, QuotationModule],
})
export class ApiModule {}
