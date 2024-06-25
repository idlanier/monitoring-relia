import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import * as moment from 'moment';

@Injectable()
export class ReceiveGoodsService {
  constructor(
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {}

  async getReceiveGoodsByDateRange(
    start_date: Date,
    end_date: Date,
    limit: number,
    offset: number,
    product_id?: number,
    ext_doc_no?: string,
  ) {
    const formattedStartDate = moment(start_date).format('YYYYMMDD');
    const formattedEndDate = moment(end_date).format('YYYYMMDD');

    let query =
      'SELECT ' +
      'B.receive_goods_id, ' +
      'B.doc_no, ' +
      'B.doc_date,' +
      'B.ext_doc_no, ' +
      'B.ext_doc_date, ' +
      'B.status_doc, ' +
      'SUM(qty_receive) AS total_qty_received, ' +
      'SUM(qty_dlv) AS total_qty_deliver, ' +
      'SUM(item_amount_gross) as total_order_value, ' +
      'SUM(item_amount_discount) as total_after_discount, ' +
      'C.product_id, ' +
      'C.product_name ' +
      'FROM pu_receive_goods_item A ' +
      'JOIN pu_receive_goods B ON A.receive_goods_id = B.receive_goods_id ' +
      'JOIN m_product C ON A.product_id = C.product_id ' +
      'WHERE B.doc_date BETWEEN $1 AND $2 ';

    if (product_id) {
      query += 'AND A.product_id = $3 ';
    }

    if (ext_doc_no) {
      query += 'AND B.ext_doc_no = $4 ';
    }

    query += 'GROUP BY B.receive_goods_id, B.doc_date, C.product_id ';
    query += 'ORDER BY doc_date DESC ';

    const params = [formattedStartDate, formattedEndDate];

    if (product_id) {
      params.push(product_id.toString());
    }

    query += `LIMIT ${limit} OFFSET ${offset} `;

    const rawData = await this.entityManager.query(query, params);

    return rawData;
  }

  async findReceiveGoodsDetailedById(id: number) {
    const rawHeaderData = await this.entityManager.query(
      'SELECT ' +
        'receive_goods_id, ' +
        'A.doc_no, ' +
        'A.doc_date, ' +
        'A.ext_doc_no, ' +
        'A.ext_doc_date,' +
        'A.status_doc, ' +
        'A.remark, ' +
        'A.remark_confirm, ' +
        'B.supplier_name, ' +
        'C.doc_no as ref_doc_no, ' +
        'C.doc_date as ref_doc_date ' +
        'FROM pu_receive_goods A ' +
        'JOIN m_supplier B ON A.supplier_id = B.supplier_id ' +
        'JOIN pu_po C ON A.ref_id = C.po_id ' +
        'WHERE A.receive_goods_id = $1 ',
      [id],
    );

    const rawDetailData = await this.entityManager.query(
      'SELECT ' +
        'A.qty_receive, ' +
        'A.qty_dlv, ' +
        'A.unit_price, ' +
        'A.flg_include_tax, ' +
        'A.item_amount_gross, ' +
        'A.item_amount_nett, ' +
        'A.item_amount_tax, ' +
        'B.product_id, ' +
        'B.product_name ' +
        'FROM pu_receive_goods_item A ' +
        'JOIN m_product B ON A.product_id = B.product_id ' +
        'WHERE A.receive_goods_id = $1 ',
      [id],
    );

    return {
      header: rawHeaderData[0],
      detail: rawDetailData,
    };
  }
}
