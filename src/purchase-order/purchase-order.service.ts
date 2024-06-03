import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import * as moment from 'moment';
import { GetPurchaseValueByDateDTO } from './dto/getRevenueByDate.dto';

@Injectable()
export class PurchaseOrderService {
  constructor(
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {}

  async getPurchaseOrderByDateRange(
    start_date: Date,
    end_date: Date,
    limit: number,
    offset: number,
    product_id?: number,
  ) {
    const formattedStartDate = moment(start_date).format('YYYYMMDD');
    const formattedEndDate = moment(end_date).format('YYYYMMDD');

    let query =
      'SELECT B.doc_date, ' +
      'B.po_id, ' +
      'B.status_doc, ' +
      'SUM(A.unit_price) as sum_price, ' +
      'SUM(A.qty) as sum_quantity, ' +
      'C.supplier_name, ' +
      'D.supplier_name as principal_name, ' +
      'E.product_id, ' +
      'E.product_name ' +
      'FROM pu_po_item A ' +
      'JOIN pu_po B ON A.po_id = B.po_id ' +
      'JOIN m_supplier C ON B.supplier_id = C.supplier_id ' +
      'JOIN m_supplier D ON B.factory_supplier_id = D.supplier_id ' +
      'JOIN m_product E ON A.product_id = E.product_id ' +
      'WHERE B.doc_date BETWEEN $1 AND $2 ';

    if (product_id) {
      query += 'AND A.product_id = $3 ';
    }

    query +=
      'GROUP BY B.po_id, B.doc_date, B.status_doc, C.supplier_name, D.supplier_name, E.product_id, E.product_name ';
    query += 'ORDER BY B.doc_date DESC ';
    query += `LIMIT ${limit} OFFSET ${offset} `;

    const params = [formattedStartDate, formattedEndDate];

    if (product_id) {
      params.push(product_id.toString());
    }

    const rawData = await this.entityManager.query(query, params);

    return rawData;
  }

  async findPurchaseOrderDetailedById(id: number) {
    const rawHeaderData = await this.entityManager.query(
      'SELECT ' +
        'po_id, ' +
        'doc_no, ' +
        'doc_date, ' +
        'ext_doc_no, ' +
        'ext_doc_date,' +
        'status_doc, ' +
        'B.supplier_name, ' +
        "COALESCE(C.supplier_name, '-') as principal_name " +
        'FROM pu_po A ' +
        'JOIN m_supplier B ON A.supplier_id = B.supplier_id ' +
        'LEFT JOIN m_supplier C ON A.factory_supplier_id = C.supplier_id ' +
        'WHERE A.po_id = $1 ',
      [id],
    );

    const rawDetailData = await this.entityManager.query(
      'SELECT ' +
        'A.qty, ' +
        'A.unit_price, ' +
        'A.item_amount_gross, ' +
        'A.item_amount_nett, ' +
        'A.item_amount_tax, ' +
        'B.product_id, ' +
        'B.product_name, ' +
        'C.pos_item_id, ' +
        'C.unit_sell_price as last_sell_price ' +
        'FROM pu_po_item A ' +
        'JOIN m_product B ON A.product_id = B.product_id ' +
        'JOIN trx_pos_item C ON A.product_id = C.product_id ' +
        'JOIN (SELECT max(pos_item_id) as pos_item_id FROM trx_pos_item GROUP BY product_id) D ' +
        'ON C.pos_item_id = D.pos_item_id ' +
        'WHERE A.po_id = $1 ',
      [id],
    );

    return {
      header: rawHeaderData[0],
      detail: rawDetailData,
    };
  }

  async getCurrentYearPurchase(product_id?: number) {
    const currentYear = moment().year();

    let query =
      'SELECT SUM((unit_price * qty)) AS purchase_value_original, ' +
      'SUM(item_amount_gross) AS purchase_value_gross, ' +
      'SUM(item_amount_nett) AS purchase_value_nett, ' +
      'COUNT(*) AS total_purchase ' +
      'FROM pu_po_item A ' +
      'JOIN pu_po B ON A.po_id = B.po_id ' +
      'WHERE LEFT(doc_date, 4) = $1 ';

    if (product_id) {
      query += 'AND A.product_id = $2 ';
    }

    const params = [currentYear];

    if (product_id) {
      params.push(product_id);
    }

    const rawData = await this.entityManager.query(query, params);

    const result = {
      purchase_value_original: Number(rawData[0].purchase_value_original),
      purchase_value_gross: Number(rawData[0].purchase_value_gross),
      purchase_value_nett: Number(rawData[0].purchase_value_nett),
      total_purchase: Number(rawData[0].total_purchase),
    };

    return result;
  }

  async getCurrentMonthPurchase(product_id?: number) {
    const currentYear = moment().year();
    const currentMonth =
      moment().month() >= 9
        ? moment().month() + 1
        : '0' + String(moment().month() + 1);

    const firstDateMonth = String(currentYear) + String(currentMonth) + '01';
    const lastDateMonth = String(currentYear) + String(currentMonth) + '31';

    let query =
      'SELECT SUM((unit_price * qty)) AS purchase_value_original, ' +
      'SUM(item_amount_gross) AS purchase_value_gross, ' +
      'SUM(item_amount_nett) AS purchase_value_nett, ' +
      'COUNT(*) AS total_purchase ' +
      'FROM pu_po_item A ' +
      'JOIN pu_po B ON A.po_id = B.po_id ' +
      'WHERE doc_date BETWEEN $1 AND $2 ';

    if (product_id) {
      query += 'AND A.product_id = $2 ';
    }

    const params = [firstDateMonth, lastDateMonth];

    if (product_id) {
      params.push(product_id.toString());
    }

    const rawData = await this.entityManager.query(query, params);

    const result = {
      purchase_value_original: Number(rawData[0].purchase_value_original),
      purchase_value_gross: Number(rawData[0].purchase_value_gross),
      purchase_value_nett: Number(rawData[0].purchase_value_nett),
      total_purchase: Number(rawData[0].total_purchase),
    };

    return result;
  }

  async getPurchaseValueByDate(
    getPurchaseValueByDateDTO: GetPurchaseValueByDateDTO,
  ) {
    let query =
      'SELECT SUM((unit_price * qty)) AS purchase_value_original, ' +
      'SUM(item_amount_gross) AS purchase_value_gross, ' +
      'SUM(item_amount_nett) AS purchase_value_nett, ' +
      'COUNT(*) AS total_purchase ' +
      'FROM pu_po_item A ' +
      'JOIN pu_po B ON A.po_id = B.po_id ' +
      'WHERE doc_date BETWEEN $1 AND $2 ';

    if (getPurchaseValueByDateDTO.product_id) {
      query += 'AND A.product_id = $2 ';
    }

    const params = [
      getPurchaseValueByDateDTO.start_date,
      getPurchaseValueByDateDTO.end_date,
    ];

    if (getPurchaseValueByDateDTO.product_id) {
      params.push(getPurchaseValueByDateDTO.product_id.toString());
    }

    const rawData = await this.entityManager.query(query, params);

    const result = {
      purchase_value_original: Number(rawData[0].purchase_value_original),
      purchase_value_gross: Number(rawData[0].purchase_value_gross),
      purchase_value_nett: Number(rawData[0].purchase_value_nett),
      total_purchase: Number(rawData[0].total_purchase),
    };

    return result;
  }
}
