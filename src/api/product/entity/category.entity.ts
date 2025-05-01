import { AbstractEntity } from 'src/database/entity/abstract.entity';
import {
  Column,
  Entity,
  PrimaryColumn,
  Tree,
  TreeChildren,
  TreeParent,
} from 'typeorm';
import { v7 } from 'uuid';

@Entity('category')
@Tree('materialized-path')
export class Category extends AbstractEntity {
  constructor(data?: Partial<Category>) {
    super();
    this.id = v7();
    Object.assign(this, data);
  }
  @PrimaryColumn()
  id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ type: 'varchar', length: 255 })
  slug: string;

  @Column({ type: 'varchar', length: 255 })
  image: string;

  @TreeChildren()
  children: Category[];

  @TreeParent()
  parent: Category;
}
