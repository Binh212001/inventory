import { Entity, Column, PrimaryColumn, ManyToOne } from 'typeorm';
import { Quotation } from './quotation.entity';
import { AbstractEntity } from 'src/database/entity/abstract.entity';
import { v7 } from 'uuid';
import { ProductTemplate } from 'src/api/product/entity/product-template.entity';

@Entity('quotation_items')
export class QuotationItem extends AbstractEntity {
  constructor(data?: Partial<QuotationItem>) {
    super();
    this.id = v7();
    Object.assign(this, data);
  }

  @PrimaryColumn()
  id: string;

  @ManyToOne(() => Quotation, (quotation) => quotation.items)
  quotation: Quotation;

  @Column({
    type: 'jsonb',
  })
  product: ProductTemplate;

  @Column({ type: 'int', default: 1 })
  quantity: number;

  @Column({ type: 'int', default: 0 })
  unitPrice: number;

  @Column({ type: 'int', default: 0 })
  totalPrice: number;
}
