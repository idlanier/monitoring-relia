import { Column, Entity } from 'typeorm';

@Entity({ name: 'm_medical_record_price_item' })
export class MedicalRecordPriceItem {
  @Column()
  medical_record_price_item_id: number;

  @Column()
  ref_id: number;

  @Column()
  product_id: number;

  @Column()
  unit_price_amount: number;

  @Column()
  qty: number;

  @Column()
  amount_gross: number;

  @Column()
  type_medical_record: string;

  @Column()
  version: number;

  @Column()
  create_datetime: number | Date;

  @Column()
  create_username: number | Date;

  @Column()
  update_datetime: number;

  @Column()
  update_username: number;

  @Column()
  line_no: number;
}
