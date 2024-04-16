import { Column, Entity } from 'typeorm';

@Entity({ name: 'pu_po' })
export class PurchaseOrder {
  @Column()
  po_id: number;

  @Column()
  record_owner_id: number;

  @Column()
  doc_type_id: number;

  @Column()
  doc_no: string;

  @Column()
  doc_date: string;

  @Column()
  ext_doc_no: string;

  @Column()
  ext_doc_date: string;

  @Column()
  supplier_id: number;

  @Column()
  ref_doc_type_id: number;

  @Column()
  ref_id: number;

  @Column()
  remark: string;

  @Column()
  curr_code: string;

  @Column()
  status_doc: string;

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
  factory_supplier_id: number;
}
