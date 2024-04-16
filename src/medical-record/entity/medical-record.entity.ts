import { Column, Entity } from 'typeorm';

@Entity({ name: 'm_medical_record' })
export class MedicalRecord {
  @Column()
  medical_record_id: number;

  @Column()
  patient_id: number;

  @Column()
  record_date: string;

  @Column()
  record_time: string;

  @Column()
  anamnesa_diagnosa: string;

  @Column()
  remark: string;

  @Column()
  next_consult_date: string;

  @Column()
  color_mark: string;

  @Column()
  version: string;

  @Column()
  create_datetime: string;

  @Column()
  create_username: string;

  @Column()
  update_datetime: string;

  @Column()
  update_username: string;

  @Column()
  remark_cashier: string;

  @Column()
  record_owner_id: number;

  @Column()
  record_type: string;

  @Column()
  consultation_queue_id: number;

  @Column()
  pos_id: string;

  @Column()
  status: string;

  @Column()
  doc_no: string;

  @Column()
  doc_date: string;

  @Column()
  doc_type_id: number;

  @Column()
  glasgow_comma_scale_e: number;

  @Column()
  glasgow_comma_scale_v: number;

  @Column()
  glasgow_comma_scale_m: number;

  @Column()
  glasgow_comma_scale_total: number;

  @Column()
  blood_pressure: string;

  @Column()
  body_temperature: string;

  @Column()
  pulse: string;

  @Column()
  respiratory_rate: string;

  @Column()
  spo2: string;

  @Column()
  use_oxygen_tools: string;

  @Column()
  ews_score: number;

  @Column()
  ews_description: string;

  @Column()
  body_height: string;

  @Column()
  body_weight: string;

  @Column()
  bmi_score: string;

  @Column()
  bmi_description: string;

  @Column()
  consciousness: string;
}
