import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';

@Injectable()
export class MedicalRecordService {
  constructor(
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {}

  async getMedicalRecordListByPatientId(
    patient_id: number,
    limit: number,
    offset: number,
  ) {
    let query =
      ' SELECT ' +
      ' A.medical_record_id, ' +
      ' A.patient_id, ' +
      ' A.record_date, ' +
      ' A.record_time, ' +
      ' A.record_type, ' +
      ' A.consultation_queue_id, ' +
      ' A.status, ' +
      ' A.doc_no, ' +
      ' A.doc_date, ' +
      ' A.doc_type_id ' +
      ' FROM m_medical_record A ' +
      ' WHERE A.patient_id = ' +
      patient_id;

    query += 'ORDER BY A.create_datetime DESC ';

    if (limit && offset) {
      query += 'LIMIT ' + limit + ' OFFSET ' + offset;
    } else {
      query += 'LIMIT 10 OFFSET 0';
    }
    const params = [];

    const rawData = await this.entityManager.query(query, params);

    return rawData;
  }

  async findMedicalRecordDetailById(medical_record_id: number) {
    let query =
      ' SELECT ' +
      ' A.medical_record_id, ' +
      ' A.patient_id, ' +
      ' A.record_date, ' +
      ' A.record_time, ' +
      ' A.anamnesa_diagnosa, ' +
      ' A.remark, ' +
      ' A.next_consult_date, ' +
      ' A.color_mark, ' +
      ' A.remark_cashier, ' +
      ' A.record_type, ' +
      ' A.consultation_queue_id, ' +
      ' A.pos_id, ' +
      ' A.status, ' +
      ' A.doc_no, ' +
      ' A.doc_date, ' +
      ' A.doc_type_id, ' +
      ' A.glasgow_comma_scale_e, ' +
      ' A.glasgow_comma_scale_v, ' +
      ' A.glasgow_comma_scale_m, ' +
      ' A.glasgow_comma_scale_total, ' +
      ' A.blood_pressure, ' +
      ' A.body_temperature, ' +
      ' A.pulse, ' +
      ' A.respiratory_rate, ' +
      ' A.spo2, ' +
      ' A.use_oxygen_tools, ' +
      ' A.ews_score, ' +
      ' A.ews_description, ' +
      ' A.body_height, ' +
      ' A.body_weight, ' +
      ' A.bmi_score, ' +
      ' A.bmi_description, ' +
      ' A.consciousness ' +
      ' FROM m_medical_record A ' +
      ' WHERE A.medical_record_id = ' +
      medical_record_id;

    const params = [];

    const rawData = await this.entityManager.query(query, params);

    const result = {
      medical_record: rawData[0],
      medical_record_physic: {},
      medical_record_treatment: [],
      medical_record_product: [],
      medical_record_price_item: [],
    };

    result.medical_record_physic = await this.findMedicalRecordPhysicById(
      medical_record_id,
    );
    result.medical_record_treatment = await this.getMedicalRecordTreatmentById(
      medical_record_id,
    );
    result.medical_record_product = await this.getMedicalRecordProductById(
      medical_record_id,
    );
    result.medical_record_price_item = await this.getMedicalRecordPriceItemById(
      medical_record_id,
    );

    return result;
  }

  async findMedicalRecordPhysicById(medical_record_id: number) {
    let query =
      ' SELECT ' +
      'A.medical_record_physic_id, ' +
      'A.medical_record_id, ' +
      'A.head_check_status, ' +
      'A.head_check_description, ' +
      'A.eye_check_status, ' +
      'A.eye_check_description, ' +
      'A.ear_check_status, ' +
      'A.ear_check_description, ' +
      'A.nose_check_status, ' +
      'A.nose_check_description, ' +
      'A.hair_check_status, ' +
      'A.hair_check_description, ' +
      'A.mouth_check_status, ' +
      'A.mouth_check_description, ' +
      'A.teeth_check_status, ' +
      'A.teeth_check_description, ' +
      'A.palate_check_status, ' +
      'A.palate_check_description, ' +
      'A.throat_check_status, ' +
      'A.throat_check_description, ' +
      'A.tonsils_check_status, ' +
      'A.tonsils_check_description, ' +
      'A.chest_check_status, ' +
      'A.chest_check_description, ' +
      'A.breast_check_status, ' +
      'A.breast_check_description, ' +
      'A.back_body_check_status, ' +
      'A.back_body_check_description, ' +
      'A.stomach_check_status, ' +
      'A.stomach_check_description, ' +
      'A.genital_check_status, ' +
      'A.genital_check_description, ' +
      'A.anus_check_status, ' +
      'A.anus_check_description, ' +
      'A.upper_arm_check_status, ' +
      'A.upper_arm_check_description, ' +
      'A.finger_check_status, ' +
      'A.finger_check_description, ' +
      'A.finger_nail_check_status, ' +
      'A.finger_nail_check_description, ' +
      'A.upper_joint_check_status, ' +
      'A.upper_joint_check_description, ' +
      'A.upper_limbs_check_status, ' +
      'A.upper_limbs_check_description, ' +
      'A.lower_limbs_check_status, ' +
      'A.lower_limbs_check_description, ' +
      'A.toe_nail_check_status, ' +
      'A.toe_nail_check_description, ' +
      'A.lower_joint_check_status, ' +
      'A.lower_joint_check_description, ' +
      'A.other_check_status, ' +
      'A.other_check_description, ' +
      'A.tongue_check_status, ' +
      'A.tongue_check_description, ' +
      'A.neck_check_status, ' +
      'A.neck_check_description, ' +
      'A.lower_arm_check_status, ' +
      'A.lower_arm_check_description ' +
      ' FROM m_medical_record_physic A ' +
      ' WHERE A.medical_record_id = ' +
      medical_record_id;

    const params = [];

    const rawData = await this.entityManager.query(query, params);

    return rawData[0];
  }

  async getMedicalRecordTreatmentById(medical_record_id: number) {
    let query =
      ' SELECT ' +
      'A.medical_record_treatment_id, ' +
      'A.medical_record_id,  ' +
      'A.line_no,  ' +
      'A.product_treatment_id,  ' +
      'C.product_name, ' +
      'C.product_code, ' +
      'A.recommend_to,  ' +
      'A.remark,  ' +
      'A.version,  ' +
      'A.create_datetime,  ' +
      'A.create_username,  ' +
      'A.update_datetime,  ' +
      'A.update_username,  ' +
      'A.flg_pay,  ' +
      'A.recommend_to_2,  ' +
      'A.recommend_to_3,  ' +
      'A.salesman_id,  ' +
      'B.full_name as salesman_name  ' +
      ' FROM m_medical_record_treatment A ' +
      ' JOIN m_salesman B ON A.salesman_id = B.salesman_id ' +
      ' JOIN m_product C ON A.product_treatment_id = C.product_id ' +
      ' WHERE A.medical_record_id = ' +
      medical_record_id;

    const params = [];

    const rawData = await this.entityManager.query(query, params);

    return rawData;
  }

  async getMedicalRecordProductById(medical_record_id: number) {
    let query =
      ' SELECT ' +
      'A.medical_record_product_id, ' +
      'A.medical_record_id, ' +
      'A.line_no, ' +
      'A.product_id, ' +
      'A.qty, ' +
      'A.remark, ' +
      'A.create_datetime, ' +
      'A.create_username, ' +
      'A.update_datetime, ' +
      'A.update_username, ' +
      'A.salesman_id,  ' +
      'B.full_name as salesman_name  ' +
      ' FROM m_medical_record_product A ' +
      ' JOIN m_salesman B ON A.salesman_id = B.salesman_id ' +
      ' WHERE A.medical_record_id = ' +
      medical_record_id;

    const params = [];

    const rawData = await this.entityManager.query(query, params);

    return rawData;
  }

  async getMedicalRecordPriceItemById(medical_record_id: number) {
    let query =
      ' SELECT ' +
      'A.medical_record_price_item_id, ' +
      'A.ref_id, ' +
      'A.product_id, ' +
      'B.product_name, ' +
      'B.product_code, ' +
      'A.unit_price_amount, ' +
      'A.qty, ' +
      'A.amount_gross, ' +
      'A.type_medical_record ' +
      ' FROM m_medical_record_price_item A ' +
      ' JOIN m_product B ON A.product_id = B.product_id ' +
      ' WHERE A.ref_id = ' +
      medical_record_id;

    const params = [];

    const rawData = await this.entityManager.query(query, params);

    return rawData;
  }
}
