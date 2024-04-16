import { Column, Entity } from 'typeorm';

@Entity({ name: 'm_medical_record_treatment' })
export class MedicalRecordTreatment {
  @Column()
  medical_record_treatment_id: number;

  @Column()
  medical_record_id: number;

  @Column()
  line_no: number;

  @Column()
  product_treatment_id: number;

  @Column()
  recommend_to: number;

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
  flg_pay: string;

  @Column()
  recommend_to_2: number;

  @Column()
  recommend_to_3: number;

  @Column()
  salesman_id: number;
}
