import { Column, Entity } from 'typeorm';

@Entity({ name: 'm_consultation_queue' })
export class ConsultationQueue {
  @Column()
  consultation_queue_id: number;

  @Column()
  record_owner_id: number;

  @Column()
  doc_date: string;

  @Column()
  prefix: string;

  @Column()
  doc_no: string;

  @Column()
  queue_no: string;

  @Column()
  patient_id: number;

  @Column()
  version: string;

  @Column()
  create_datetime: string | Date;

  @Column()
  create_username: string | Date;

  @Column()
  update_datetime: string | Date;

  @Column()
  update_username: string | Date;

  @Column()
  ou_code_alias: string;

  @Column()
  flg_used: string;
}
