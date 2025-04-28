import { AbstractEntity } from 'src/database/entity/abstract.entity';
import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { v7 } from 'uuid';
import { ProductVariantAttribute } from './product-variant-attribute.entity';

@Entity('product_variant_values')
export class ProductVariantValue extends AbstractEntity {
  constructor(data?: Partial<ProductVariantValue>) {
    super();
    this.id = v7();
    Object.assign(this, data);
  }
  @PrimaryColumn()
  id: string;

  @Column({ type: 'varchar', length: 100 })
  value: string; // Ví dụ: "Đỏ", "Xanh", "Lớn", "Nhỏ"

  @ManyToOne(() => ProductVariantAttribute, (attribute) => attribute.values, {
    onDelete: 'CASCADE',
  })
  attribute: ProductVariantAttribute; // Thuộc tính mà giá trị này thuộc về
}
