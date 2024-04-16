import { Column, Entity } from 'typeorm';

@Entity({ name: 'm_patient' })
export class Patient {
  @Column()
  patient_id: number;

  @Column()
  record_owner_id: number;

  @Column()
  register_from_outlet_id: number;

  @Column()
  patient_code: string;

  @Column()
  fullname: string;

  @Column()
  short_name: string;

  @Column()
  identity_no: string;

  @Column()
  identity_type: string;

  @Column()
  place_of_birth: string;

  @Column()
  date_of_birth: string;

  @Column()
  gender: string;

  @Column()
  phone1: string;

  @Column()
  phone2: string;

  @Column()
  address_line1: string;

  @Column()
  address_line2: string;

  @Column()
  country_id: number;

  @Column()
  province_id: number;

  @Column()
  city_id: number;

  @Column()
  district_id: number;

  @Column()
  zip_code: string;

  @Column()
  current_address_line1: string;

  @Column()
  current_address_line2: string;

  @Column()
  current_country_id: number;

  @Column()
  current_province_id: number;

  @Column()
  current_city_id: number;

  @Column()
  current_district_id: number;

  @Column()
  current_zip_code: number;

  @Column()
  ig: string;

  @Column()
  fb: string;

  @Column()
  educational_level: string;

  @Column()
  religion: string;

  @Column()
  job_title: string;

  @Column()
  patient_level: string;

  @Column()
  flg_visit_outlet: string;

  @Column()
  marital_status: string;

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

  @Column()
  salutation: string;

  @Column()
  email: string;
}
