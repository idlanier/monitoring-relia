import { Column, Entity } from 'typeorm';

@Entity({ name: 'pu_po_receive_goods_item' })
export class ReceiveGoodsItem {
  @Column()
  receive_goods_item_id: number;

  @Column()
  receive_goods_id: number;

  @Column()
  ref_item_id: number;

  @Column()
  product_id: number;

  @Column()
  qty_receive: number;

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
  qty_dlv: number;
}
