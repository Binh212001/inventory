import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { ProductTemplate } from './product-template.entity';

@Entity('product_variants')
export class ProductVariant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50 })
  sku: string;

  @Column({ type: 'integer', default: 0 })
  stockQuantity: number;

  @Column({ type: 'boolean', default: false })
  isAvailable: boolean;

  @ManyToOne(() => ProductTemplate, (template) => template.variants, {
    onDelete: 'CASCADE',
  })
  productTemplate: ProductTemplate;
}