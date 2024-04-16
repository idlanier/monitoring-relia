import { Column, Entity } from 'typeorm';

@Entity({ name: 'pu_po_balance_item' })
export class PurchaseOrderBalanceItem {
  @Column()
  po_item_id: number;

  @Column()
  record_owner_id: number;

  @Column()
  qty_po: number;

  @Column()
  qty_rcv: number;

  @Column()
  qty_return: number;

  @Column()
  qty_cancel: number;

  @Column()
  qty_add: number;

  @Column()
  uom_code: string;

  @Column()
  qty_int_po: number;

  @Column()
  qty_int_rcv: number;

  @Column()
  qty_int_return: number;

  @Column()
  qty_int_cancel: number;

  @Column()
  qty_int_add: number;

  @Column()
  base_uom_code: string;

  @Column()
  tolerance_rcv_qty: number;

  @Column()
  status_item: string;

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
