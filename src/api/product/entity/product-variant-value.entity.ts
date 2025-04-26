import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { ProductVariantAttribute } from './product-variant-attribute.entity';

@Entity('product_variant_values')
export class ProductVariantValue {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  value: string; // Ví dụ: "Đỏ", "Xanh", "Lớn", "Nhỏ"

  @ManyToOne(() => ProductVariantAttribute, (attribute) => attribute.values, {
    onDelete: 'CASCADE',
  })
  attribute: ProductVariantAttribute; // Thuộc tính mà giá trị này thuộc về
}