import { Entity, Column, PrimaryColumn, ManyToOne, OneToMany } from 'typeorm';
import { v4 as uuidv4, v7 } from 'uuid';
import { AbstractEntity } from 'src/database/entity/abstract.entity';
import { User } from 'src/api/user/entity/user.entity';
import { QuotationItem } from './quotation-item.entity';

export enum QuotationStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
}

@Entity('quotations')
export class Quotation extends AbstractEntity {
  constructor(data?: Partial<Quotation>) {
    super();
    this.id = v7();
    Object.assign(this, data);
  }

  @PrimaryColumn()
  id: string;

  @ManyToOne(() => User, { eager: true })
  customer: User;

  @OneToMany(() => QuotationItem, (item) => item.quotation, {
    cascade: true,
    eager: true,
  })
  items: QuotationItem[];

  @Column({ type: 'int', default: 0 })
  totalAmount: number;

  @Column({
    type: 'enum',
    enum: QuotationStatus,
    default: QuotationStatus.PENDING,
  })
  status: QuotationStatus;
}
