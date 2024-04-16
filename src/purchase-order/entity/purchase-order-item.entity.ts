import { Column, Entity } from 'typeorm';

@Entity({ name: 'pu_po_item' })
export class PurchaseOrderItem {
  @Column()
  po_item_id: number;

  @Column()
  po_id: number;

  @Column()
  product_id: number;

  @Column()
  qty: number;

  @Column()
  unit_price: number;

  @Column()
  flg_include_tax: string;

  @Column()
  tax_id: number;

  @Column()
  tax_percentage: number;

  @Column()
  item_amount_discount: number;

  @Column()
  item_amount_gross: number;

  @Column()
  item_amount_nett: number;

  @Column()
  item_amount_tax: number;

  @Column()
  item_remark: string;

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
