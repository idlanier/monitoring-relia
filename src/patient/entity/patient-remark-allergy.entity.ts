import { Column, Entity } from 'typeorm';

@Entity({ name: 'm_patient_remark_allergy' })
export class PatientRemarkAllergy {
  @Column()
  patient_remark_allergy_id: number;

  @Column()
  patient_id: number;

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

  @Column()
  active: string;

  @Column()
  active_datetime: string | Date;

  @Column()
  non_active_datetime: string;
}
