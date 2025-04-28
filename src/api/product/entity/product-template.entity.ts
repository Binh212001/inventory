import { AbstractEntity } from 'src/database/entity/abstract.entity';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { v7 } from 'uuid';
import { ProductVariant } from './product-variant.entity';

@Entity('product_templates')
export class ProductTemplate extends AbstractEntity {
  constructor(data?: Partial<ProductTemplate>) {
    super();
    this.id = v7();
    Object.assign(this, data);
  }
  @PrimaryColumn()
  id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ nullable: true })
  sku: string;

  @Column({ nullable: true })
  barcode: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'jsonb', nullable: false })
  image: string[];

  @Column({ type: 'int', default: 0 })
  price: number;

  @Column({ type: 'boolean', default: true })
  active: boolean;

  @OneToMany(() => ProductVariant, (variant) => variant.productTemplate, {
    eager: true,
  })
  variants: ProductVariant[];
}
