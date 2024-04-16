import { Column, Entity } from "typeorm";

@Entity({name: 'trx_pos_item'})
export class PosItem {
  @Column()
  pos_item_id: number;
  
  @Column()
  pos_id: number;
  
  @Column()
  line_no: string;
  
  @Column()
  product_id: number;
  
  @Column()
  qty: number;
  
  @Column()
  price_level_id: number;
  
  @Column()
  unit_sell_price: number;
  
  @Column()
  item_discount_amount: number;
  
  @Column()
  item_amount: number;
  
  @Column()
  item_amount_after_discount: number;
  
  @Column()
  item_remark: number;
  
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
  item_discount_percentage: string;
  
  @Column()
  flg_free_product: string;
  
  @Column()
  flg_upselling: string;
  
  @Column()
  salesman_id: number;
  
  @Column()
  flg_salesman_can_edit: string;
  
  @Column()
  tindakan_by_1_salesman_id: number;
  
  @Column()
  tindakan_by_2_salesman_id: number;
  
  @Column()
  tindakan_by_3_salesman_id: number;
  
  @Column()
  medical_record_product_id: number;
  
  @Column()
  medical_record_treatment_id: number;
  
  @Column()
  discount_header_on_item: string;
  
}
