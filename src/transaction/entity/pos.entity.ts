import { Column, Entity } from "typeorm";

@Entity({name: 'trx_pos'})
export class Pos {
  @Column()
  pos_id: number;
  
  @Column()
  record_owner_id: number;
  
  @Column()
  doc_type_id: number;
  
  @Column()
  doc_no: string;
  
  @Column()
  doc_date: string;
  
  @Column()
  warehouse_id: number;
  
  @Column()
  salesman_id: number;
  
  @Column()
  customer_id: number;
  
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
  discount_amount: string;
  
  @Column()
  discount_percentage: string;
  
  @Column()
  flg_has_upselling: string;
  
  @Column()
  flg_upselling_approved: string;
  
  @Column()
  promo_id: number;
  
  @Column()
  voucher_balance_id: number;
  
  @Column()
  remark_void: string;
  
  @Column()
  upselling_approved_user_id: number;
  
  @Column()
  upselling_approved_datetime: string;
  
  @Column()
  discount_type: string;
  
}
