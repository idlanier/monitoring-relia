import { Column, Entity } from 'typeorm';

@Entity({ name: 'in_inventory' })
export class Inventory {
  @Column()
  inventory_id: number;

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
  remark: string;

  @Column()
  warehouse_id: number;

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
  ref_doc_type_id: number;

  @Column()
  ref_id: number;
}
