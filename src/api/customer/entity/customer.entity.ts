import { AbstractEntity } from 'src/database/entity/abstract.entity';
import { Column, Entity, PrimaryColumn } from 'typeorm';
import { v7 } from 'uuid';

@Entity('customer')
export class Customer extends AbstractEntity {
  constructor(data?: Partial<Customer>) {
    super();
    this.id = v7();
    Object.assign(this, data);
  }
  @PrimaryColumn()
  id: string;

  @Column()
  email: string;

  @Column()
  mobile: string;

  @Column()
  addressLine1: string;

  @Column({ nullable: true })
  addressLine2?: string;

  @Column()
  town: string;

  @Column()
  state: string;

  @Column()
  postCode: string;

  @Column()
  country: string;
  @Column({
    type: 'int',
    default: 0,
  })
  totalOrder: number;
  @Column({
    type: 'int',
    default: 0,
  })
  totalSpent: number;
  @Column({ default: false })
  useAsBillingAddress: boolean;
}
