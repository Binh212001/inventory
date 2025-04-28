import { AbstractEntity } from 'src/database/entity/abstract.entity';
import { hashPassword } from 'src/utils/password.util';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryColumn,
} from 'typeorm';
import { v7 } from 'uuid';

@Entity('users')
export class User extends AbstractEntity {
  constructor(data?: Partial<User>) {
    super();
    this.id = v7();
    Object.assign(this, data);
  }
  @PrimaryColumn()
  id: string;

  @Column()
  email: string;

  @Column({
    nullable: true,
  })
  password: string;

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

  @Column({ default: false })
  isCustomer: boolean;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password && !this.isPasswordHashed()) {
      this.password = await hashPassword(this.password);
    }
  }

  private isPasswordHashed(): boolean {
    return this.password.startsWith('$argon2');
  }
}
