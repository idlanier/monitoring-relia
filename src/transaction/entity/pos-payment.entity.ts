import { Column, Entity } from "typeorm";

@Entity({name: 'trx_pos_payment'})
export class PosPayment {
  @Column()
  pos_payment_id: number;
  
  @Column()
  pos_id: number;
  
  @Column()
  line_no: string;
  
  @Column()
  payment_type: string;
  
  @Column()
  curr_code: string;
  
  @Column()
  payment_ref_no: string;
  
  @Column()
  payment_amount: string;
  
  @Column()
  payment_remark: string;
  
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
  device_merchant_id: number;
  
  @Column()
  nett_payment_amount: string;
  
  @Column()
  additional_fee: string;
  
  @Column()
  device_merchant_web_id: number;
  
  @Column()
  refund: string;
  
}
