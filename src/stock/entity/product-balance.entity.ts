import { Column, Entity } from 'typeorm';

@Entity({ name: 'in_product_balance' })
export class ProductBalance {
  @Column()
  product_balance_id: number;

  @Column()
  tenant_id: number;

  @Column()
  record_owner_id: number;

  @Column()
  product_id: number;

  @Column()
  serial_number: string;

  @Column()
  lot_number: string;

  @Column()
  product_expired_date: string;

  @Column()
  product_year_made: string;

  @Column()
  version: string;

  @Column()
  create_datetime: string | Date;

  @Column()
  create_user_id: string;

  @Column()
  update_datetime: string | Date;

  @Column()
  update_user_id: string;
}
