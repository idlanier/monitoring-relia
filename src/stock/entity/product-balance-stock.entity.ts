import { Column, Entity } from 'typeorm';

@Entity({ name: 'in_product_balance_stock' })
export class ProductBalanceStock {
  @Column()
  product_balance_stock_id: number;

  @Column()
  record_owner_id: number;

  @Column()
  product_balance_id: number;

  @Column()
  product_id: number;

  @Column()
  warehouse_id: number;

  @Column()
  product_status: string;

  @Column()
  qty: number;

  @Column()
  version: string;

  @Column()
  create_datetime: string | Date;

  @Column()
  create_username: string;

  @Column()
  update_datetime: string | Date;

  @Column()
  update_username: string;
}
