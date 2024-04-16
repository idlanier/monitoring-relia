import { Column, Entity } from 'typeorm';

@Entity({ name: 'pu_po_balance_item' })
export class PurchaseOrderBalanceInvoice {
  @Column()
  po_balance_invoice_id: number;

  @Column()
  record_owner_id: number;

  @Column()
  ref_doc_type_id: number;

  @Column()
  ref_id: number;

  @Column()
  qty_recieve: number;

  @Column()
  buy_price: number;

  @Column()
  total_gross_amount: number;

  @Column()
  flg_invoice: string;

  @Column()
  invoice_id: number;

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
  ref_item_id: number;

  @Column()
  po_id: number;

  @Column()
  po_item_id: number;
}
