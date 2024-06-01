import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import * as moment from 'moment';
import { GetRevenueByDateDTO } from './dto/getRevenueByDate.dto';
import { getLast7DaysDate } from './util/getLast7DaysDate.util';
import { getFirstDayOfTheWeek } from './util/getFirstDayOfTheWeek.util';
import { getLastDayOfTheWeek } from './util/getLastDayOfTheWeek.util';

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

  async getCurrentWeekRevenue() {
    const firstDay = getFirstDayOfTheWeek();
    const seventhDay = getLastDayOfTheWeek();

    const rawData = await this.entityManager.query(
      'SELECT SUM(payment_amount) AS revenue, ' +
        'COUNT(*) AS total_order ' +
        'FROM pj.trx_pos_payment A ' +
        'JOIN pj.trx_pos B ON A.pos_id = B.pos_id ' +
        'WHERE doc_date BETWEEN $1 AND $2',
      [firstDay, seventhDay],
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

  async getLast7DaysRevenue() {
    const { first, second, third, fourth, fifth, sixth, seventh } =
      getLast7DaysDate();

    const firstDayRawData = await this.entityManager.query(
      'SELECT SUM(payment_amount) AS revenue, ' +
        'COUNT(*) AS total_order ' +
        'FROM pj.trx_pos_payment A ' +
        'JOIN pj.trx_pos B ON A.pos_id = B.pos_id ' +
        'WHERE doc_date = $1',
      [first],
    );

    const secondDayRawData = await this.entityManager.query(
      'SELECT SUM(payment_amount) AS revenue, ' +
        'COUNT(*) AS total_order ' +
        'FROM pj.trx_pos_payment A ' +
        'JOIN pj.trx_pos B ON A.pos_id = B.pos_id ' +
        'WHERE doc_date = $1',
      [second],
    );

    const thirdDayRawData = await this.entityManager.query(
      'SELECT SUM(payment_amount) AS revenue, ' +
        'COUNT(*) AS total_order ' +
        'FROM pj.trx_pos_payment A ' +
        'JOIN pj.trx_pos B ON A.pos_id = B.pos_id ' +
        'WHERE doc_date = $1',
      [third],
    );

    const fourthDayRawData = await this.entityManager.query(
      'SELECT SUM(payment_amount) AS revenue, ' +
        'COUNT(*) AS total_order ' +
        'FROM pj.trx_pos_payment A ' +
        'JOIN pj.trx_pos B ON A.pos_id = B.pos_id ' +
        'WHERE doc_date = $1',
      [fourth],
    );

    const fifthDayRawData = await this.entityManager.query(
      'SELECT SUM(payment_amount) AS revenue, ' +
        'COUNT(*) AS total_order ' +
        'FROM pj.trx_pos_payment A ' +
        'JOIN pj.trx_pos B ON A.pos_id = B.pos_id ' +
        'WHERE doc_date = $1',
      [fifth],
    );

    const sixthDayRawData = await this.entityManager.query(
      'SELECT SUM(payment_amount) AS revenue, ' +
        'COUNT(*) AS total_order ' +
        'FROM pj.trx_pos_payment A ' +
        'JOIN pj.trx_pos B ON A.pos_id = B.pos_id ' +
        'WHERE doc_date = $1',
      [sixth],
    );

    const seventhDayRawData = await this.entityManager.query(
      'SELECT SUM(payment_amount) AS revenue, ' +
        'COUNT(*) AS total_order ' +
        'FROM pj.trx_pos_payment A ' +
        'JOIN pj.trx_pos B ON A.pos_id = B.pos_id ' +
        'WHERE doc_date = $1',
      [seventh],
    );

    const result = {
      firstDay: {
        revenue: Number(firstDayRawData[0].revenue),
        total_order: Number(firstDayRawData[0].total_order),
      },
      secondDay: {
        revenue: Number(secondDayRawData[0].revenue),
        total_order: Number(secondDayRawData[0].total_order),
      },
      thirdDay: {
        revenue: Number(thirdDayRawData[0].revenue),
        total_order: Number(thirdDayRawData[0].total_order),
      },
      fourthDay: {
        revenue: Number(fourthDayRawData[0].revenue),
        total_order: Number(fourthDayRawData[0].total_order),
      },
      fifthDay: {
        revenue: Number(fifthDayRawData[0].revenue),
        total_order: Number(fifthDayRawData[0].total_order),
      },
      sixthDay: {
        revenue: Number(sixthDayRawData[0].revenue),
        total_order: Number(sixthDayRawData[0].total_order),
      },
      seventhDay: {
        revenue: Number(seventhDayRawData[0].revenue),
        total_order: Number(seventhDayRawData[0].total_order),
      },
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

  async getCurrentYearDetailedRevenue() {
    const currentYear = moment().year();

    const januaryFirstDateMonth = String(currentYear) + '01' + '01';
    const januaryLastDateMonth = String(currentYear) + '01' + '31';

    const febuaryFirstDateMonth = String(currentYear) + '02' + '01';
    const febuaryLastDateMonth = String(currentYear) + '02' + '31';

    const marchFirstDateMonth = String(currentYear) + '03' + '01';
    const marchLastDateMonth = String(currentYear) + '03' + '31';

    const aprilFirstDateMonth = String(currentYear) + '04' + '01';
    const aprilLastDateMonth = String(currentYear) + '04' + '31';

    const mayFirstDateMonth = String(currentYear) + '05' + '01';
    const mayLastDateMonth = String(currentYear) + '05' + '31';

    const juneFirstDateMonth = String(currentYear) + '06' + '01';
    const juneLastDateMonth = String(currentYear) + '06' + '31';

    const julyFirstDateMonth = String(currentYear) + '07' + '01';
    const julyLastDateMonth = String(currentYear) + '07' + '31';

    const augustFirstDateMonth = String(currentYear) + '08' + '01';
    const augustLastDateMonth = String(currentYear) + '08' + '31';

    const septemberFirstDateMonth = String(currentYear) + '09' + '01';
    const septemberLastDateMonth = String(currentYear) + '09' + '31';

    const octoberFirstDateMonth = String(currentYear) + '10' + '01';
    const octoberLastDateMonth = String(currentYear) + '10' + '31';

    const novemberFirstDateMonth = String(currentYear) + '11' + '01';
    const novemberLastDateMonth = String(currentYear) + '11' + '31';

    const decemberFirstDateMonth = String(currentYear) + '12' + '01';
    const decemberLastDateMonth = String(currentYear) + '12' + '31';

    const januaryRawData = await this.entityManager.query(
      'SELECT SUM(payment_amount) AS revenue, ' +
        'COUNT(*) AS total_order ' +
        'FROM pj.trx_pos_payment A ' +
        'JOIN pj.trx_pos B ON A.pos_id = B.pos_id ' +
        'WHERE doc_date BETWEEN $1 AND $2',
      [januaryFirstDateMonth, januaryLastDateMonth],
    );

    const febuaryRawData = await this.entityManager.query(
      'SELECT SUM(payment_amount) AS revenue, ' +
        'COUNT(*) AS total_order ' +
        'FROM pj.trx_pos_payment A ' +
        'JOIN pj.trx_pos B ON A.pos_id = B.pos_id ' +
        'WHERE doc_date BETWEEN $1 AND $2',
      [febuaryFirstDateMonth, febuaryLastDateMonth],
    );

    const marchRawData = await this.entityManager.query(
      'SELECT SUM(payment_amount) AS revenue, ' +
        'COUNT(*) AS total_order ' +
        'FROM pj.trx_pos_payment A ' +
        'JOIN pj.trx_pos B ON A.pos_id = B.pos_id ' +
        'WHERE doc_date BETWEEN $1 AND $2',
      [marchFirstDateMonth, marchLastDateMonth],
    );

    const aprilRawData = await this.entityManager.query(
      'SELECT SUM(payment_amount) AS revenue, ' +
        'COUNT(*) AS total_order ' +
        'FROM pj.trx_pos_payment A ' +
        'JOIN pj.trx_pos B ON A.pos_id = B.pos_id ' +
        'WHERE doc_date BETWEEN $1 AND $2',
      [aprilFirstDateMonth, aprilLastDateMonth],
    );

    const mayRawData = await this.entityManager.query(
      'SELECT SUM(payment_amount) AS revenue, ' +
        'COUNT(*) AS total_order ' +
        'FROM pj.trx_pos_payment A ' +
        'JOIN pj.trx_pos B ON A.pos_id = B.pos_id ' +
        'WHERE doc_date BETWEEN $1 AND $2',
      [mayFirstDateMonth, mayLastDateMonth],
    );

    const juneRawData = await this.entityManager.query(
      'SELECT SUM(payment_amount) AS revenue, ' +
        'COUNT(*) AS total_order ' +
        'FROM pj.trx_pos_payment A ' +
        'JOIN pj.trx_pos B ON A.pos_id = B.pos_id ' +
        'WHERE doc_date BETWEEN $1 AND $2',
      [juneFirstDateMonth, juneLastDateMonth],
    );

    const julyRawData = await this.entityManager.query(
      'SELECT SUM(payment_amount) AS revenue, ' +
        'COUNT(*) AS total_order ' +
        'FROM pj.trx_pos_payment A ' +
        'JOIN pj.trx_pos B ON A.pos_id = B.pos_id ' +
        'WHERE doc_date BETWEEN $1 AND $2',
      [julyFirstDateMonth, julyLastDateMonth],
    );

    const augustRawData = await this.entityManager.query(
      'SELECT SUM(payment_amount) AS revenue, ' +
        'COUNT(*) AS total_order ' +
        'FROM pj.trx_pos_payment A ' +
        'JOIN pj.trx_pos B ON A.pos_id = B.pos_id ' +
        'WHERE doc_date BETWEEN $1 AND $2',
      [augustFirstDateMonth, augustLastDateMonth],
    );

    const septemberRawData = await this.entityManager.query(
      'SELECT SUM(payment_amount) AS revenue, ' +
        'COUNT(*) AS total_order ' +
        'FROM pj.trx_pos_payment A ' +
        'JOIN pj.trx_pos B ON A.pos_id = B.pos_id ' +
        'WHERE doc_date BETWEEN $1 AND $2',
      [septemberFirstDateMonth, septemberLastDateMonth],
    );

    const octoberRawData = await this.entityManager.query(
      'SELECT SUM(payment_amount) AS revenue, ' +
        'COUNT(*) AS total_order ' +
        'FROM pj.trx_pos_payment A ' +
        'JOIN pj.trx_pos B ON A.pos_id = B.pos_id ' +
        'WHERE doc_date BETWEEN $1 AND $2',
      [octoberFirstDateMonth, octoberLastDateMonth],
    );

    const novemberRawData = await this.entityManager.query(
      'SELECT SUM(payment_amount) AS revenue, ' +
        'COUNT(*) AS total_order ' +
        'FROM pj.trx_pos_payment A ' +
        'JOIN pj.trx_pos B ON A.pos_id = B.pos_id ' +
        'WHERE doc_date BETWEEN $1 AND $2',
      [novemberFirstDateMonth, novemberLastDateMonth],
    );

    const decemberRawData = await this.entityManager.query(
      'SELECT SUM(payment_amount) AS revenue, ' +
        'COUNT(*) AS total_order ' +
        'FROM pj.trx_pos_payment A ' +
        'JOIN pj.trx_pos B ON A.pos_id = B.pos_id ' +
        'WHERE doc_date BETWEEN $1 AND $2',
      [decemberFirstDateMonth, decemberLastDateMonth],
    );

    const result = [
      {
        month: 'Jan',
        revenue: Number(januaryRawData[0].revenue),
        total_order: Number(januaryRawData[0].total_order),
      },
      {
        month: 'Feb',
        revenue: Number(febuaryRawData[0].revenue),
        total_order: Number(febuaryRawData[0].total_order),
      },
      {
        month: 'Mar',
        revenue: Number(marchRawData[0].revenue),
        total_order: Number(marchRawData[0].total_order),
      },
      {
        month: 'Apr',
        revenue: Number(aprilRawData[0].revenue),
        total_order: Number(aprilRawData[0].total_order),
      },
      {
        month: 'May',
        revenue: Number(mayRawData[0].revenue),
        total_order: Number(mayRawData[0].total_order),
      },
      {
        month: 'Jun',
        revenue: Number(juneRawData[0].revenue),
        total_order: Number(juneRawData[0].total_order),
      },
      {
        month: 'Jul',
        revenue: Number(julyRawData[0].revenue),
        total_order: Number(julyRawData[0].total_order),
      },
      {
        month: 'Aug',
        revenue: Number(augustRawData[0].revenue),
        total_order: Number(augustRawData[0].total_order),
      },
      {
        month: 'Sep',
        revenue: Number(septemberRawData[0].revenue),
        total_order: Number(septemberRawData[0].total_order),
      },
      {
        month: 'Oct',
        revenue: Number(octoberRawData[0].revenue),
        total_order: Number(octoberRawData[0].total_order),
      },
      {
        month: 'Nov',
        revenue: Number(novemberRawData[0].revenue),
        total_order: Number(novemberRawData[0].total_order),
      },
      {
        month: 'Dec',
        revenue: Number(decemberRawData[0].revenue),
        total_order: Number(decemberRawData[0].total_order),
      },
    ];

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
