import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ProductVariant } from './product-variant.entity';

@Entity('product_templates')
export class ProductTemplate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'float', default: 0.0 })
  price: number;

  @Column({ type: 'boolean', default: true })
  active: boolean;

  @OneToMany(() => ProductVariant, (variant) => variant.productTemplate, {
    cascade: true,
  })
  variants: ProductVariant[];
}