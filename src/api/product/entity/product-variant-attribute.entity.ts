import { AbstractEntity } from 'src/database/entity/abstract.entity';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { v7 } from 'uuid';
import { ProductVariantValue } from './product-variant-value.entity';

@Entity('product_variant_attributes')
export class ProductVariantAttribute extends AbstractEntity {
  constructor(data?: Partial<ProductVariantAttribute>) {
    super();
    this.id = v7();
    Object.assign(this, data);
  }

  @PrimaryColumn()
  id: string;

  @Column({ type: 'varchar', length: 100 })
  name: string; // Ví dụ: "Màu sắc", "Kích thước"

  @OneToMany(() => ProductVariantValue, (value) => value.attribute, {
    eager: true,
  })
  values: ProductVariantValue[]; // Danh sách các giá trị liên quan đến thuộc tính này
}
