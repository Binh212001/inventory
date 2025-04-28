import { Module } from '@nestjs/common';
import { QuotationController } from './quotation.controller';
import { QuotationService } from './quotation.service';
import { QuotationRepository } from './repository/quotation.repository';
import { QuotationItemRepository } from './repository/quotation-item.repository';

@Module({
  controllers: [QuotationController],
  providers: [QuotationService, QuotationRepository, QuotationItemRepository],
})
export class QuotationModule {}
