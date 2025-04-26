import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ProductVariantValue } from './product-variant-value.entity';

@Entity('product_variant_attributes')
export class ProductVariantAttribute {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  name: string; // Ví dụ: "Màu sắc", "Kích thước"

  @OneToMany(() => ProductVariantValue, (value) => value.attribute, {
    cascade: true,
  })
  values: ProductVariantValue[]; // Danh sách các giá trị liên quan đến thuộc tính này
}