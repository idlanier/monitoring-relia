import { Column, Entity } from 'typeorm';

@Entity({ name: 'm_medical_record_physic' })
export class MedicalRecordPhysic {
  @Column()
  medical_record_physic_id: number;

  @Column()
  medical_record_id: number;

  @Column()
  head_check_status: string;

  @Column()
  head_check_description: string;

  @Column()
  eye_check_status: string;

  @Column()
  eye_check_description: string;

  @Column()
  ear_check_status: string;

  @Column()
  ear_check_description: string;

  @Column()
  nose_check_status: string;

  @Column()
  nose_check_description: string;

  @Column()
  hair_check_status: string;

  @Column()
  hair_check_description: string;

  @Column()
  mouth_check_status: string;

  @Column()
  mouth_check_description: string;

  @Column()
  teeth_check_status: string;

  @Column()
  teeth_check_description: string;

  @Column()
  palate_check_status: string;

  @Column()
  palate_check_description: string;

  @Column()
  throat_check_status: string;

  @Column()
  throat_check_description: string;

  @Column()
  tonsils_check_status: string;

  @Column()
  tonsils_check_description: string;

  @Column()
  chest_check_status: string;

  @Column()
  chest_check_description: string;

  @Column()
  breast_check_status: string;

  @Column()
  breast_check_description: string;

  @Column()
  back_body_check_status: string;

  @Column()
  back_body_check_description: string;

  @Column()
  stomach_check_status: string;

  @Column()
  stomach_check_description: string;

  @Column()
  genital_check_status: string;

  @Column()
  genital_check_description: string;

  @Column()
  anus_check_status: string;

  @Column()
  anus_check_description: string;

  @Column()
  upper_arm_check_status: string;

  @Column()
  upper_arm_check_description: string;

  @Column()
  finger_check_status: string;

  @Column()
  finger_check_description: string;

  @Column()
  finger_nail_check_status: string;

  @Column()
  finger_nail_check_description: string;

  @Column()
  upper_joint_check_status: string;

  @Column()
  upper_joint_check_description: string;

  @Column()
  upper_limbs_check_status: string;

  @Column()
  upper_limbs_check_description: string;

  @Column()
  lower_limbs_check_status: string;

  @Column()
  lower_limbs_check_description: string;

  @Column()
  toe_nail_check_status: string;

  @Column()
  toe_nail_check_description: string;

  @Column()
  lower_joint_check_status: string;

  @Column()
  lower_joint_check_description: string;

  @Column()
  other_check_status: string;

  @Column()
  other_check_description: string;

  @Column()
  tongue_check_status: string;

  @Column()
  tongue_check_description: string;

  @Column()
  neck_check_status: string;

  @Column()
  neck_check_description: string;

  @Column()
  lower_arm_check_status: string;

  @Column()
  lower_arm_check_description: string;
}
