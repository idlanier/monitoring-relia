import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';

@Injectable()
export class PatientService {
  constructor(
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {}

  async getPatientList(
    patient_name: string,
    patient_code: string,
    limit: number,
    offset: number,
  ) {
    let query =
      ' SELECT ' +
      'A.patient_id, ' +
      'A.salutation, ' +
      'A.patient_code, ' +
      'A.fullname, ' +
      'A.short_name, ' +
      'A.gender, ' +
      'A.place_of_birth, ' +
      'A.date_of_birth, ' +
      'A.address_line1, ' +
      'A.current_address_line1, ' +
      'A.religion ' +
      ' FROM m_patient A ' +
      ' WHERE A.patient_id != -99 ';

    if (patient_name) {
      query += " AND A.fullname ILIKE '%" + patient_name + "%' ";
    }

    if (patient_code) {
      query += " AND A.patient_code ILIKE '%" + patient_code + "%' ";
    }

    if (limit && offset) {
      query += 'LIMIT ' + limit + ' OFFSET ' + offset;
    } else {
      query += 'LIMIT 10 OFFSET 0';
    }

    const params = [];

    const rawData = await this.entityManager.query(query, params);

    return rawData;
  }

  async findPatientById(patient_id: number) {
    let query =
      ' SELECT ' +
      'A.salutation, ' +
      'A.patient_code, ' +
      'A.fullname, ' +
      'A.short_name, ' +
      'A.gender, ' +
      'A.place_of_birth, ' +
      'A.date_of_birth, ' +
      'A.address_line1, ' +
      'A.current_address_line1, ' +
      'A.religion ' +
      ' FROM m_patient A ' +
      ' WHERE A.patient_id = ' +
      patient_id;

    const params = [];

    const rawData = await this.entityManager.query(query, params);

    return rawData;
  }
}
