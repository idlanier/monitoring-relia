import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import * as moment from 'moment';

@Injectable()
export class TransactionService {
  constructor(
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {}

  async getTransactionByDateRange(
    start_date: Date,
    end_date: Date,
    product_id?: number,
  ) {
    const formattedStartDate = moment(start_date).format('YYYYMMDD');
    const formattedEndDate = moment(end_date).format('YYYYMMDD');

    let query =
      'SELECT ' +
      'B.pos_id, ' +
      'B.doc_date,' +
      'D.full_name as salesman_name, ' +
      "array_to_string(array_agg(distinct C.product_name),', ') AS products, " +
      'SUM(qty) AS total_qty, ' +
      'SUM(item_discount_amount) AS total_discount, ' +
      'SUM(item_amount) as total_order_value, ' +
      'SUM(item_amount_after_discount) as total_after_discount ' +
      'FROM trx_pos_item A ' +
      'JOIN trx_pos B ON A.pos_id = B.pos_id ' +
      'JOIN m_product C ON A.product_id = C.product_id ' +
      'JOIN m_salesman D ON A.salesman_id = D.salesman_id ' +
      'WHERE B.doc_date BETWEEN $1 AND $2 ';

    if (product_id) {
      query += 'AND A.product_id IN ($3) ';
    }

    query += 'GROUP BY B.pos_id, B.doc_date, D.full_name ';
    query += 'ORDER BY doc_date DESC ';

    const params = [formattedStartDate, formattedEndDate];

    if (product_id) {
      params.push(product_id.toString());
    }

    const rawData = await this.entityManager.query(query, params);

    return rawData;
  }

  async findTransactionDetailedById(id: number) {
    const rawHeaderData = await this.entityManager.query(
      'SELECT ' +
        'doc_no, ' +
        'doc_date, ' +
        'status_doc, ' +
        'B.customer_name ' +
        'FROM trx_pos A ' +
        'JOIN m_customer B ON A.customer_id = B.customer_id ' +
        'WHERE A.pos_id = $1 ',
      [id],
    );

    const rawDetailData = await this.entityManager.query(
      'SELECT ' +
        'A.qty, ' +
        'A.unit_sell_price, ' +
        'A.item_discount_amount, ' +
        'A.item_amount, ' +
        'A.item_amount_after_discount, ' +
        'B.product_id, ' +
        'B.product_name, ' +
        'C.salesman_id, ' +
        'C.full_name ' +
        'FROM trx_pos_item A ' +
        'JOIN m_product B ON A.product_id = B.product_id ' +
        'JOIN m_salesman C ON A.salesman_id = C.salesman_id ' +
        'WHERE A.pos_id = $1 ',
      [id],
    );

    const rawPaymentData = await this.entityManager.query(
      'SELECT ' +
        'A.payment_type, ' +
        'A.payment_amount, ' +
        'A.nett_payment_amount ' +
        'FROM trx_pos_payment A ' +
        'WHERE A.pos_id = $1 ',
      [id],
    );

    return {
      header: rawHeaderData[0],
      detail: rawDetailData,
      payment: rawPaymentData,
    };
  }
}
