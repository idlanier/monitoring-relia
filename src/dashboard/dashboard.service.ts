import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import * as moment from 'moment';
import { GetRevenueByDateDTO } from './dto/getRevenueByDate.dto';

@Injectable()
export class DashboardService {
  constructor(
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {}

  async getCurrentYearRevenue() {
    const currentYear = moment().year();

    const rawData = await this.entityManager.query(
      'SELECT SUM(payment_amount) AS revenue, ' +
        'COUNT(*) AS total_order ' +
        'FROM pj.trx_pos_payment A ' +
        'JOIN pj.trx_pos B ON A.pos_id = B.pos_id ' +
        'WHERE LEFT(doc_date, 4) = $1',
      [currentYear],
    );

    const result = {
      revenue: Number(rawData[0].revenue),
      total_order: Number(rawData[0].total_order),
    };

    return result;
  }

  async getCurrentMonthRevenue() {
    const currentYear = moment().year();
    const currentMonth =
      moment().month() >= 9
        ? moment().month() + 1
        : '0' + String(moment().month() + 1);

    const firstDateMonth = String(currentYear) + String(currentMonth) + '01';
    const lastDateMonth = String(currentYear) + String(currentMonth) + '31';

    const rawData = await this.entityManager.query(
      'SELECT SUM(payment_amount) AS revenue, ' +
        'COUNT(*) AS total_order ' +
        'FROM pj.trx_pos_payment A ' +
        'JOIN pj.trx_pos B ON A.pos_id = B.pos_id ' +
        'WHERE doc_date BETWEEN $1 AND $2',
      [firstDateMonth, lastDateMonth],
    );

    const result = {
      revenue: Number(rawData[0].revenue),
      total_order: Number(rawData[0].total_order),
    };

    return result;
  }

  async getCurrentDayRevenue() {
    const currentDate = moment().format('YYYYMMDD');

    const rawData = await this.entityManager.query(
      'SELECT SUM(payment_amount) AS revenue, ' +
        'COUNT(*) AS total_order ' +
        'FROM pj.trx_pos_payment A ' +
        'JOIN pj.trx_pos B ON A.pos_id = B.pos_id ' +
        'WHERE doc_date = $1',
      [currentDate],
    );

    const result = {
      revenue: Number(rawData[0].revenue),
      total_order: Number(rawData[0].total_order),
    };

    return result;
  }

  async getRevenueByDate(getRevenueByDate: GetRevenueByDateDTO) {
    const rawData = await this.entityManager.query(
      'SELECT SUM(payment_amount) AS revenue, ' +
        'COUNT(*) AS total_order ' +
        'FROM pj.trx_pos_payment A ' +
        'JOIN pj.trx_pos B ON A.pos_id = B.pos_id ' +
        'WHERE doc_date BETWEEN $1 AND $2',
      [getRevenueByDate.start_date, getRevenueByDate.end_date],
    );

    const result = {
      revenue: Number(rawData[0].revenue),
      total_order: Number(rawData[0].total_order),
    };

    return result;
  }

  async getCurrentYearMostSoldProductBySales() {
    const currentYear = moment().year();

    const rawData = await this.entityManager.query(
      'SELECT C.product_name as product_name, ' +
        'D.ctgr_product_name as product_category_name, ' +
        'SUM(A.unit_sell_price) as total_sales ' +
        'FROM pj.trx_pos_item A ' +
        'JOIN pj.trx_pos B ON A.pos_id = B.pos_id ' +
        'JOIN public.m_product C ON A.product_id = C.product_id ' +
        'JOIN m_ctgr_product D ON D.ctgr_product_id = C.ctgr_product_id ' +
        'WHERE LEFT(doc_date, 4) = $1 ' +
        'GROUP BY C.product_id, D.ctgr_product_name ' +
        'ORDER BY sum(A.unit_sell_price) DESC ' +
        'LIMIT 10',
      [currentYear],
    );

    return rawData;
  }

  async getCurrentYearMostSoldProductByQuantity() {
    const currentYear = moment().year();

    const rawData = await this.entityManager.query(
      'SELECT C.product_name as product_name, ' +
        'D.ctgr_product_name as product_category_name, ' +
        'SUM(A.qty) as total_qty ' +
        'FROM pj.trx_pos_item A ' +
        'JOIN pj.trx_pos B ON A.pos_id = B.pos_id ' +
        'JOIN public.m_product C ON A.product_id = C.product_id ' +
        'JOIN m_ctgr_product D ON D.ctgr_product_id = C.ctgr_product_id ' +
        'WHERE LEFT(doc_date, 4) = $1 ' +
        'GROUP BY C.product_id, D.ctgr_product_name ' +
        'ORDER BY sum(A.qty) DESC ' +
        'LIMIT 10',
      [currentYear],
    );

    return rawData;
  }

  async getCurrentMonthMostSoldProductBySales() {
    const currentYear = moment().year();
    const currentMonth =
      moment().month() >= 9
        ? moment().month() + 1
        : '0' + String(moment().month() + 1);

    const firstDateMonth = String(currentYear) + String(currentMonth) + '01';
    const lastDateMonth = String(currentYear) + String(currentMonth) + '31';

    const rawData = await this.entityManager.query(
      'SELECT C.product_name as product_name, ' +
        'D.ctgr_product_name as product_category_name, ' +
        'SUM(A.unit_sell_price) as total_sales ' +
        'FROM pj.trx_pos_item A ' +
        'JOIN pj.trx_pos B ON A.pos_id = B.pos_id ' +
        'JOIN public.m_product C ON A.product_id = C.product_id ' +
        'JOIN m_ctgr_product D ON D.ctgr_product_id = C.ctgr_product_id ' +
        'WHERE doc_date BETWEEN $1 AND $2' +
        'GROUP BY C.product_id, D.ctgr_product_name ' +
        'ORDER BY sum(A.unit_sell_price) DESC ' +
        'LIMIT 10',
      [firstDateMonth, lastDateMonth],
    );

    return rawData;
  }

  async getCurrentMonthMostSoldProductByQuantity() {
    const currentYear = moment().year();
    const currentMonth =
      moment().month() >= 9
        ? moment().month() + 1
        : '0' + String(moment().month() + 1);

    const firstDateMonth = String(currentYear) + String(currentMonth) + '01';
    const lastDateMonth = String(currentYear) + String(currentMonth) + '31';

    const rawData = await this.entityManager.query(
      'SELECT C.product_name as product_name, ' +
        'D.ctgr_product_name as product_category_name, ' +
        'SUM(A.qty) as total_qty ' +
        'FROM pj.trx_pos_item A ' +
        'JOIN pj.trx_pos B ON A.pos_id = B.pos_id ' +
        'JOIN public.m_product C ON A.product_id = C.product_id ' +
        'JOIN m_ctgr_product D ON D.ctgr_product_id = C.ctgr_product_id ' +
        'WHERE doc_date BETWEEN $1 AND $2' +
        'GROUP BY C.product_id, D.ctgr_product_name ' +
        'ORDER BY sum(A.qty) DESC ' +
        'LIMIT 10',
      [firstDateMonth, lastDateMonth],
    );

    return rawData;
  }

  async getCurrentDayQueue() {
    const currentDate = moment().format('YYYYMMDD');

    const rawData = await this.entityManager.query(
      'SELECT count(*) as total_queue ' +
        'FROM mstr.m_consultation_queue ' +
        'WHERE doc_date = $1',
      [currentDate],
    );

    const result = {
      total_queue: Number(rawData[0].total_queue),
    };

    return result;
  }

  async getCurrentDayTotalOrderVsTotalPayment() {
    const currentDate = moment().format('YYYYMMDD');

    const orderRawData = await this.entityManager.query(
      'SELECT count(*) as total_order ' +
        'FROM pj.trx_pos ' +
        'WHERE doc_date = $1',
      [currentDate],
    );

    const paymentRawData = await this.entityManager.query(
      'SELECT count(*) as total_payment ' +
        'FROM pj.trx_pos_payment ' +
        'WHERE LEFT(create_datetime, 8) = $1',
      [currentDate],
    );

    const result = {
      total_order: Number(orderRawData[0].total_order),
      total_payment: Number(paymentRawData[0].total_payment),
    };

    return result;
  }
}
