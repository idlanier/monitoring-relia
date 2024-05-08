import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import * as moment from 'moment';
import { EntityManager } from 'typeorm';

@Injectable()
export class ConsultationQueueService {
  constructor(
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {}

  async getConsultationQueueByDate(dateParam: Date) {
    const formattedDate = moment(dateParam).format('YYYYMMDD');

    const rawData = await this.entityManager.query(
      'SELECT doc_date AS queue_date, ' +
        'queue_no, ' +
        'salutation, ' +
        'fullname as patient_name, ' +
        'RIGHT(A.create_datetime, 6)::time as time ' +
        'FROM mstr.m_consultation_queue A ' +
        'JOIN mstr.m_patient B ON A.patient_id = B.patient_id  ' +
        'WHERE doc_date = $1',
      [formattedDate],
    );

    return rawData;
  }
}
