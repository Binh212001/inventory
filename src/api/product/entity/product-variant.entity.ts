import { AbstractEntity } from 'src/database/entity/abstract.entity';
import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { v7 } from 'uuid';
import { ProductTemplate } from './product-template.entity';
import { ProductVariantAttribute } from './product-variant-attribute.entity';
import { ProductVariantValue } from './product-variant-value.entity';
@Entity('product_variants')
export class ProductVariant extends AbstractEntity {
  constructor(data?: Partial<ProductVariant>) {
    super();
    this.id = v7();
    Object.assign(this, data);
  }
  @PrimaryColumn()
  id: string;

  @Column({ type: 'varchar', length: 50 })
  sku: string;

  @Column({ type: 'integer', default: 0 })
  stockQuantity: number;

  @Column({ type: 'boolean', default: false })
  isAvailable: boolean;

  @ManyToOne(() => ProductTemplate, (template) => template.variants, {})
  productTemplate: ProductTemplate;

  @Column({ type: 'jsonb' })
  attribute: ProductVariantAttribute;

  @Column({ type: 'jsonb' })
  value: ProductVariantValue;
}
