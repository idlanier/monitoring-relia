import { Column, Entity } from 'typeorm';

@Entity({ name: 'm_patient_prohibited_product' })
export class PatientProhibitedProduct {
  @Column()
  patient_prohibited_product_id: number;

  @Column()
  patient_id: number;

  @Column()
  product_id: number;

  @Column()
  remark: string;

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
