import { Column, Entity } from 'typeorm';

@Entity({ name: 'm_product' })
export class Product {
  @Column()
  product_id: number;

  @Column()
  record_owner_id: number;

  @Column()
  tenant_id: number;

  @Column()
  product_code: string;

  @Column()
  product_name: string;

  @Column()
  ctgr_product_id: number;

  @Column()
  sub_ctgr_product_id: number;

  @Column()
  brand_id: number;

  @Column()
  base_uom_id: number;

  @Column()
  uom_id_1: number;

  @Column()
  uom_id_2: number;

  @Column()
  uom_id_3: number;

  @Column()
  flg_buy: string;

  @Column()
  flg_sell: string;

  @Column()
  min_qty: string;

  @Column()
  max_qty: string;

  @Column()
  create_datetime: string | Date;

  @Column()
  create_user_id: number;

  @Column()
  update_datetime: string | Date;

  @Column()
  update_user_id: number;

  @Column()
  version: string;

  @Column()
  active: string;

  @Column()
  active_datetime: string | Date;

  @Column()
  non_active_datetime: string;

  @Column()
  class_product: string;
}
