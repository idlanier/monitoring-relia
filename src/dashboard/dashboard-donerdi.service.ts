import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import * as moment from 'moment';
import { GetRevenueByDateDTO } from './dto/getRevenueByDate.dto';
import { getLast7DaysDate } from './util/getLast7DaysDate.util';
import { getFirstDayOfTheWeek } from './util/getFirstDayOfTheWeek.util';
import { getLastDayOfTheWeek } from './util/getLastDayOfTheWeek.util';

@Injectable()
export class DashboardDonerdiService {
  constructor(
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {}

  async getCurrentYearRevenue() {
    const currentYear = moment().year();

    const rawData = await this.entityManager.query(
      'SELECT SUM(A.item_amount_after_discount) AS revenue, ' +
        'COUNT(DISTINCT B.pos_id) AS total_order ' +
        'FROM pj.trx_pos_item A ' +
        'JOIN pj.trx_pos B ON A.pos_id = B.pos_id ' +
        'WHERE LEFT(doc_date, 4) = $1 ' +
        'AND A.item_amount_after_discount <> 1 ' +
        'AND A.item_amount_after_discount <> 0 ' +
        'AND A.unit_sell_price <> 1 ' +
        'AND A.unit_sell_price <> 0 ' +
        `AND A.product_id ${this.generateDonerdiProductId()} `,
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
      'SELECT SUM(A.item_amount_after_discount) AS revenue, ' +
        'COUNT(DISTINCT B.pos_id) AS total_order ' +
        'FROM pj.trx_pos_item A ' +
        'JOIN pj.trx_pos B ON A.pos_id = B.pos_id ' +
        'WHERE doc_date BETWEEN $1 AND $2 ' +
        'AND A.item_amount_after_discount <> 1 ' +
        'AND A.item_amount_after_discount <> 0 ' +
        'AND A.unit_sell_price <> 1 ' +
        'AND A.unit_sell_price <> 0 ' +
        `AND A.product_id ${this.generateDonerdiProductId()} `,
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
      'SELECT SUM(A.item_amount_after_discount) AS revenue, ' +
        'COUNT(DISTINCT B.pos_id) AS total_order ' +
        'FROM pj.trx_pos_item A ' +
        'JOIN pj.trx_pos B ON A.pos_id = B.pos_id ' +
        'WHERE doc_date BETWEEN $1 AND $2 ' +
        'AND A.item_amount_after_discount <> 1 ' +
        'AND A.item_amount_after_discount <> 0 ' +
        'AND A.unit_sell_price <> 1 ' +
        'AND A.unit_sell_price <> 0 ' +
        `AND A.product_id ${this.generateDonerdiProductId()} `,
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
      'SELECT SUM(A.item_amount_after_discount) AS revenue, ' +
        'COUNT(DISTINCT B.pos_id) AS total_order ' +
        'FROM pj.trx_pos_item A ' +
        'JOIN pj.trx_pos B ON A.pos_id = B.pos_id ' +
        'WHERE doc_date = $1 ' +
        'AND A.item_amount_after_discount <> 1 ' +
        'AND A.item_amount_after_discount <> 0 ' +
        'AND A.unit_sell_price <> 1 ' +
        'AND A.unit_sell_price <> 0 ' +
        `AND A.product_id ${this.generateDonerdiProductId()} `,
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
      'SELECT SUM(A.item_amount_after_discount) AS revenue, ' +
        'COUNT(DISTINCT B.pos_id) AS total_order ' +
        'FROM pj.trx_pos_item A ' +
        'JOIN pj.trx_pos B ON A.pos_id = B.pos_id ' +
        'WHERE doc_date = $1 ' +
        'AND A.item_amount_after_discount <> 1 ' +
        'AND A.item_amount_after_discount <> 0 ' +
        'AND A.unit_sell_price <> 1 ' +
        'AND A.unit_sell_price <> 0 ' +
        `AND A.product_id ${this.generateDonerdiProductId()} `,
      [first],
    );

    const secondDayRawData = await this.entityManager.query(
      'SELECT SUM(A.item_amount_after_discount) AS revenue, ' +
        'COUNT(DISTINCT B.pos_id) AS total_order ' +
        'FROM pj.trx_pos_item A ' +
        'JOIN pj.trx_pos B ON A.pos_id = B.pos_id ' +
        'WHERE doc_date = $1 ' +
        'AND A.item_amount_after_discount <> 1 ' +
        'AND A.item_amount_after_discount <> 0 ' +
        'AND A.unit_sell_price <> 1 ' +
        'AND A.unit_sell_price <> 0 ' +
        `AND A.product_id ${this.generateDonerdiProductId()} `,
      [second],
    );

    const thirdDayRawData = await this.entityManager.query(
      'SELECT SUM(A.item_amount_after_discount) AS revenue, ' +
        'COUNT(DISTINCT B.pos_id) AS total_order ' +
        'FROM pj.trx_pos_item A ' +
        'JOIN pj.trx_pos B ON A.pos_id = B.pos_id ' +
        'WHERE doc_date = $1 ' +
        'AND A.item_amount_after_discount <> 1 ' +
        'AND A.item_amount_after_discount <> 0 ' +
        'AND A.unit_sell_price <> 1 ' +
        'AND A.unit_sell_price <> 0 ' +
        `AND A.product_id ${this.generateDonerdiProductId()} `,
      [third],
    );

    const fourthDayRawData = await this.entityManager.query(
      'SELECT SUM(A.item_amount_after_discount) AS revenue, ' +
        'COUNT(DISTINCT B.pos_id) AS total_order ' +
        'FROM pj.trx_pos_item A ' +
        'JOIN pj.trx_pos B ON A.pos_id = B.pos_id ' +
        'WHERE doc_date = $1 ' +
        'AND A.item_amount_after_discount <> 1 ' +
        'AND A.item_amount_after_discount <> 0 ' +
        'AND A.unit_sell_price <> 1 ' +
        'AND A.unit_sell_price <> 0 ' +
        `AND A.product_id ${this.generateDonerdiProductId()} `,
      [fourth],
    );

    const fifthDayRawData = await this.entityManager.query(
      'SELECT SUM(A.item_amount_after_discount) AS revenue, ' +
        'COUNT(DISTINCT B.pos_id) AS total_order ' +
        'FROM pj.trx_pos_item A ' +
        'JOIN pj.trx_pos B ON A.pos_id = B.pos_id ' +
        'WHERE doc_date = $1 ' +
        'AND A.item_amount_after_discount <> 1 ' +
        'AND A.item_amount_after_discount <> 0 ' +
        'AND A.unit_sell_price <> 1 ' +
        'AND A.unit_sell_price <> 0 ' +
        `AND A.product_id ${this.generateDonerdiProductId()} `,
      [fifth],
    );

    const sixthDayRawData = await this.entityManager.query(
      'SELECT SUM(A.item_amount_after_discount) AS revenue, ' +
        'COUNT(DISTINCT B.pos_id) AS total_order ' +
        'FROM pj.trx_pos_item A ' +
        'JOIN pj.trx_pos B ON A.pos_id = B.pos_id ' +
        'WHERE doc_date = $1 ' +
        'AND A.item_amount_after_discount <> 1 ' +
        'AND A.item_amount_after_discount <> 0 ' +
        'AND A.unit_sell_price <> 1 ' +
        'AND A.unit_sell_price <> 0 ' +
        `AND A.product_id ${this.generateDonerdiProductId()} `,
      [sixth],
    );

    const seventhDayRawData = await this.entityManager.query(
      'SELECT SUM(A.item_amount_after_discount) AS revenue, ' +
        'COUNT(DISTINCT B.pos_id) AS total_order ' +
        'FROM pj.trx_pos_item A ' +
        'JOIN pj.trx_pos B ON A.pos_id = B.pos_id ' +
        'WHERE doc_date = $1 ' +
        'AND A.item_amount_after_discount <> 1 ' +
        'AND A.item_amount_after_discount <> 0 ' +
        'AND A.unit_sell_price <> 1 ' +
        'AND A.unit_sell_price <> 0 ' +
        `AND A.product_id ${this.generateDonerdiProductId()} `,
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
      'SELECT SUM(A.item_amount_after_discount) AS revenue, ' +
        'COUNT(DISTINCT B.pos_id) AS total_order ' +
        'FROM pj.trx_pos_item A ' +
        'JOIN pj.trx_pos B ON A.pos_id = B.pos_id ' +
        'WHERE doc_date BETWEEN $1 AND $2 ' +
        'AND A.item_amount_after_discount <> 1 ' +
        'AND A.item_amount_after_discount <> 0 ' +
        'AND A.unit_sell_price <> 1 ' +
        'AND A.unit_sell_price <> 0 ' +
        `AND A.product_id ${this.generateDonerdiProductId()} `,
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
      'SELECT SUM(A.item_amount_after_discount) AS revenue, ' +
        'COUNT(DISTINCT B.pos_id) AS total_order ' +
        'FROM pj.trx_pos_item A ' +
        'JOIN pj.trx_pos B ON A.pos_id = B.pos_id ' +
        'WHERE doc_date BETWEEN $1 AND $2 ' +
        'AND A.item_amount_after_discount <> 1 ' +
        'AND A.item_amount_after_discount <> 0 ' +
        'AND A.unit_sell_price <> 1 ' +
        'AND A.unit_sell_price <> 0 ' +
        `AND A.product_id ${this.generateDonerdiProductId()} `,
      [januaryFirstDateMonth, januaryLastDateMonth],
    );

    const febuaryRawData = await this.entityManager.query(
      'SELECT SUM(A.item_amount_after_discount) AS revenue, ' +
        'COUNT(DISTINCT B.pos_id) AS total_order ' +
        'FROM pj.trx_pos_item A ' +
        'JOIN pj.trx_pos B ON A.pos_id = B.pos_id ' +
        'WHERE doc_date BETWEEN $1 AND $2 ' +
        'AND A.item_amount_after_discount <> 1 ' +
        'AND A.item_amount_after_discount <> 0 ' +
        'AND A.unit_sell_price <> 1 ' +
        'AND A.unit_sell_price <> 0 ' +
        `AND A.product_id ${this.generateDonerdiProductId()} `,
      [febuaryFirstDateMonth, febuaryLastDateMonth],
    );

    const marchRawData = await this.entityManager.query(
      'SELECT SUM(A.item_amount_after_discount) AS revenue, ' +
        'COUNT(DISTINCT B.pos_id) AS total_order ' +
        'FROM pj.trx_pos_item A ' +
        'JOIN pj.trx_pos B ON A.pos_id = B.pos_id ' +
        'WHERE doc_date BETWEEN $1 AND $2 ' +
        'AND A.item_amount_after_discount <> 1 ' +
        'AND A.item_amount_after_discount <> 0 ' +
        'AND A.unit_sell_price <> 1 ' +
        'AND A.unit_sell_price <> 0 ' +
        `AND A.product_id ${this.generateDonerdiProductId()} `,
      [marchFirstDateMonth, marchLastDateMonth],
    );

    const aprilRawData = await this.entityManager.query(
      'SELECT SUM(A.item_amount_after_discount) AS revenue, ' +
        'COUNT(DISTINCT B.pos_id) AS total_order ' +
        'FROM pj.trx_pos_item A ' +
        'JOIN pj.trx_pos B ON A.pos_id = B.pos_id ' +
        'WHERE doc_date BETWEEN $1 AND $2 ' +
        'AND A.item_amount_after_discount <> 1 ' +
        'AND A.item_amount_after_discount <> 0 ' +
        'AND A.unit_sell_price <> 1 ' +
        'AND A.unit_sell_price <> 0 ' +
        `AND A.product_id ${this.generateDonerdiProductId()} `,
      [aprilFirstDateMonth, aprilLastDateMonth],
    );

    const mayRawData = await this.entityManager.query(
      'SELECT SUM(A.item_amount_after_discount) AS revenue, ' +
        'COUNT(DISTINCT B.pos_id) AS total_order ' +
        'FROM pj.trx_pos_item A ' +
        'JOIN pj.trx_pos B ON A.pos_id = B.pos_id ' +
        'WHERE doc_date BETWEEN $1 AND $2 ' +
        'AND A.item_amount_after_discount <> 1 ' +
        'AND A.item_amount_after_discount <> 0 ' +
        'AND A.unit_sell_price <> 1 ' +
        'AND A.unit_sell_price <> 0 ' +
        `AND A.product_id ${this.generateDonerdiProductId()} `,
      [mayFirstDateMonth, mayLastDateMonth],
    );

    const juneRawData = await this.entityManager.query(
      'SELECT SUM(A.item_amount_after_discount) AS revenue, ' +
        'COUNT(DISTINCT B.pos_id) AS total_order ' +
        'FROM pj.trx_pos_item A ' +
        'JOIN pj.trx_pos B ON A.pos_id = B.pos_id ' +
        'WHERE doc_date BETWEEN $1 AND $2 ' +
        'AND A.item_amount_after_discount <> 1 ' +
        'AND A.item_amount_after_discount <> 0 ' +
        'AND A.unit_sell_price <> 1 ' +
        'AND A.unit_sell_price <> 0 ' +
        `AND A.product_id ${this.generateDonerdiProductId()} `,
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
      'SELECT SUM(A.item_amount_after_discount) AS revenue, ' +
        'COUNT(DISTINCT B.pos_id) AS total_order ' +
        'FROM pj.trx_pos_item A ' +
        'JOIN pj.trx_pos B ON A.pos_id = B.pos_id ' +
        'WHERE doc_date BETWEEN $1 AND $2 ' +
        'AND A.item_amount_after_discount <> 1 ' +
        'AND A.item_amount_after_discount <> 0 ' +
        'AND A.unit_sell_price <> 1 ' +
        'AND A.unit_sell_price <> 0 ' +
        `AND A.product_id ${this.generateDonerdiProductId()} `,
      [augustFirstDateMonth, augustLastDateMonth],
    );

    const septemberRawData = await this.entityManager.query(
      'SELECT SUM(A.item_amount_after_discount) AS revenue, ' +
        'COUNT(DISTINCT B.pos_id) AS total_order ' +
        'FROM pj.trx_pos_item A ' +
        'JOIN pj.trx_pos B ON A.pos_id = B.pos_id ' +
        'WHERE doc_date BETWEEN $1 AND $2 ' +
        'AND A.item_amount_after_discount <> 1 ' +
        'AND A.item_amount_after_discount <> 0 ' +
        'AND A.unit_sell_price <> 1 ' +
        'AND A.unit_sell_price <> 0 ' +
        `AND A.product_id ${this.generateDonerdiProductId()} `,
      [septemberFirstDateMonth, septemberLastDateMonth],
    );

    const octoberRawData = await this.entityManager.query(
      'SELECT SUM(A.item_amount_after_discount) AS revenue, ' +
        'COUNT(DISTINCT B.pos_id) AS total_order ' +
        'FROM pj.trx_pos_item A ' +
        'JOIN pj.trx_pos B ON A.pos_id = B.pos_id ' +
        'WHERE doc_date BETWEEN $1 AND $2 ' +
        'AND A.item_amount_after_discount <> 1 ' +
        'AND A.item_amount_after_discount <> 0 ' +
        'AND A.unit_sell_price <> 1 ' +
        'AND A.unit_sell_price <> 0 ' +
        `AND A.product_id ${this.generateDonerdiProductId()} `,
      [octoberFirstDateMonth, octoberLastDateMonth],
    );

    const novemberRawData = await this.entityManager.query(
      'SELECT SUM(A.item_amount_after_discount) AS revenue, ' +
        'COUNT(DISTINCT B.pos_id) AS total_order ' +
        'FROM pj.trx_pos_item A ' +
        'JOIN pj.trx_pos B ON A.pos_id = B.pos_id ' +
        'WHERE doc_date BETWEEN $1 AND $2 ' +
        'AND A.item_amount_after_discount <> 1 ' +
        'AND A.item_amount_after_discount <> 0 ' +
        'AND A.unit_sell_price <> 1 ' +
        'AND A.unit_sell_price <> 0 ' +
        `AND A.product_id ${this.generateDonerdiProductId()} `,
      [novemberFirstDateMonth, novemberLastDateMonth],
    );

    const decemberRawData = await this.entityManager.query(
      'SELECT SUM(A.item_amount_after_discount) AS revenue, ' +
        'COUNT(DISTINCT B.pos_id) AS total_order ' +
        'FROM pj.trx_pos_item A ' +
        'JOIN pj.trx_pos B ON A.pos_id = B.pos_id ' +
        'WHERE doc_date BETWEEN $1 AND $2 ' +
        'AND A.item_amount_after_discount <> 1 ' +
        'AND A.item_amount_after_discount <> 0 ' +
        'AND A.unit_sell_price <> 1 ' +
        'AND A.unit_sell_price <> 0 ' +
        `AND A.product_id ${this.generateDonerdiProductId()} `,
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
        `AND A.product_id ${this.generateDonerdiProductId()} ` +
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
        `AND A.product_id ${this.generateDonerdiProductId()} ` +
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
        'WHERE doc_date BETWEEN $1 AND $2 ' +
        `AND A.product_id ${this.generateDonerdiProductId()} ` +
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
        'WHERE doc_date BETWEEN $1 AND $2 ' +
        `AND A.product_id ${this.generateDonerdiProductId()} ` +
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

  generateDonerdiProductId() {
    return 'IN ( 593, 54, 684, 57, 1833, 58, 59, 60, 443, 1425, 596, 810, 811, 737, 458, 61, 1837, 688, 699, 63, 1053, 649, 650, 64, 1661, 651, 65, 575, 555, 610, 809, 389, 1585, 68, 782, 12, 70, 391, 1788, 73, 1695, 74, 653, 1351, 652, 1141, 75, 1077, 1078, 736, 76, 77, 78, 79, 1675, 1739, 1339, 1676, 616, 1766, 81, 711, 1414, 1475, 82, 1793, 83, 1253, 1587, 830, 84, 673, 462, 85, 86, 1831, 963, 727, 392, 87, 570, 524, 739, 657, 89, 393, 394, 778, 92, 91, 848, 1854, 967, 958, 956, 94, 587, 95, 96, 97, 98, 99, 785, 1171, 1479, 563, 564, 567, 628, 839, 840, 338, 15, 1656, 102, 1102, 523, 1175, 614, 617, 1063, 1349, 581, 103, 16, 844, 1418, 395, 551, 552, 1792, 1225, 553, 104, 820, 105, 818, 1783, 1446, 325, 106, 410, 1847, 408, 719, 1436, 1249, 667, 1454, 51, 109, 749, 747, 111, 1212, 497, 1453, 112, 113, 655, 1507, 783, 1449, 115, 1426, 1849, 750, 1363, 1743, 1747, 773, 705, 121, 694, 122, 123, 1826, 600, 343, 126, 732, 823, 1473, 127, 128, 1755, 730, 1658, 529, 738, 588, 763, 822, 1550, 133, 18, 1728, 856, 19, 134, 445, 603, 1819, 1586, 136, 346, 396, 814, 1166, 1167, 1156, 602, 743, 1732, 722, 723, 1204, 141, 1468, 1094, 1093, 1420, 1021, 142, 784, 573, 1626, 1164, 1442, 1899, 579, 518, 589, 1196, 1891, 709, 609, 629, 350, 1513, 1355, 546, 1868, 146, 354, 528, 858, 1902, 332, 704, 703, 149, 707, 153, 702, 158, 622, 611, 162, 164, 327, 948, 165, 166, 605, 169, 172, 425, 1443, 791, 173, 577, 565, 591, 618, 175, 557, 708, 358, 1471, 745, 176, 780, 177, 178, 179, 491, 180, 181, 1830, 1543, 1771, 24, 182, 185, 25, 1429, 190, 606, 831, 825, 615, 511, 1341, 361, 192, 1893, 962, 583, 966, 467, 630, 195, 196, 541, 447, 448, 1340, 201, 202, 203, 205, 789, 206, 1302, 1903, 621, 207, 842, 211, 212, 1801, 1497, 214, 364, 1428, 218, 1645, 1517, 1519, 761, 712, 1730, 681, 1650, 220, 398, 632, 631, 221, 1800, 576, 843, 608, 1731, 585, 584, 1744, 1808, 1882, 471, 666, 721, 960, 369, 1213, 852, 227, 550, 1706, 1255, 1415, 1452, 228, 726, 753, 1137, 1251, 713, 714, 1751, 230, 231, 234, 370, 235, 1200, 30, 32, 236, 1839, 33, 1364, 237, 648, 720, 239, 34, 635, 542, 1642, 1207, 1273, 1504, 35, 1237, 36, 240, 604, 527, 1027, 530, 813, 812, 794, 371, 607, 242, 755, 474, 475, 476, 1263, 549, 243, 477, 1769, 728, 1606, 1600, 1365, 718, 1835, 1750, 815, 372, 1444, 246, 951, 949, 682, 247, 494, 594, 627, 324, 499, 595, 554, 249, 955, 850, 559, 400, 1161, 758, 1674, 251, 580, 1878, 252, 1827, 1857, 1840, 39, 544, 254, 787, 374, 375, 259, 1201, 260, 451, 457, 452, 261, 762, 1897, 1814, 1884, 1821, 1876, 1850, 1287, 1357, 715, 41, 266, 1270, 265, 578, 562, 847, 509, 377, 1578, 267, 1168, 1817, 1883, 268, 1450, 269, 679, 597, 42, 661, 660, 272, 817, 1582, 671, 276, 1785, 277, 1353, 1259, 1258, 590, 620, 561, 816, 379, 278, 279, 1869, 280, 757, 281, 282, 1236, 1243, 285, 43, 286, 380, 287, 586, 1146, 1652, 1643, 700, 291, 453, 454, 1845, 1422, 1692, 1825, 455, 456, 1393, 849, 521, 1260, 296, 297, 624, 401, 672, 299, 498, 302, 48, 305, 572, 482, 1752, 381, 568, 731, 1665, 1742, 1824, 1421, 514, 777, 793, 309, 599, 311, 49, 1430, 1853, 520, 1688, 1352, 1581, 313, 314, 717, 646, 1347, 315, 558, 1268, 1890, 1812, 50, 1246, 1245, 512, 1254, 386, 1815, 405, 1082, 406)';
  }
}
