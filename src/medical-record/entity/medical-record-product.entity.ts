import { Column, Entity } from 'typeorm';

@Entity({ name: 'm_medical_record_product' })
export class MedicalRecordProduct {
  @Column()
  medical_record_product_id: number;

  @Column()
  medical_record_id: number;

  @Column()
  line_no: number;

  @Column()
  product_id: number;

  @Column()
  qty: number;

  @Column()
  remark: string;

  @Column()
  version: number;

  @Column()
  create_datetime: string | Date;

  @Column()
  create_username: string;

  @Column()
  update_datetime: string | Date;

  @Column()
  update_username: string;

  @Column()
  salesman_id: number;
}
