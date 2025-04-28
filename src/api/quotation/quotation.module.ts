import { Module } from '@nestjs/common';
import { QuotationController } from './quotation.controller';
import { QuotationService } from './quotation.service';
import { QuotationRepository } from './repository/quotation.repository';
import { QuotationItemRepository } from './repository/quotation-item.repository';
import { ProductModule } from '../product/product.module';
import { UserModule } from '../user/customer.module';

@Module({
  imports: [ProductModule, UserModule],
  controllers: [QuotationController],
  providers: [QuotationService, QuotationRepository, QuotationItemRepository],
})
export class QuotationModule {}
