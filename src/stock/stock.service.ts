import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';

@Injectable()
export class StockService {
  constructor(
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {}

  async getStockList(limit: number, offset: number, product_id?: number) {
    let query =
      'SELECT ' +
      'C.product_id, ' +
      'C.product_name, ' +
      'B.qty ' +
      'FROM in_product_balance A ' +
      'JOIN in_product_balance_stock B ON A.product_balance_id = B.product_balance_id ' +
      'JOIN m_product C ON A.product_id = C.product_id ' +
      'WHERE C.product_id <> -99 ';

    if (product_id) {
      query += 'AND C.product_id = $1 ';
    }

    query += 'ORDER BY C.product_name ASC ';
    query += `LIMIT ${limit} OFFSET ${offset} `;

    const params = [];

    if (product_id) {
      params.push(product_id);
    }

    const rawData = await this.entityManager.query(query, params);

    return rawData;
  }

  async getProductStockDetail(id: number, limit: number, offset: number) {
    const rawHeaderData = await this.entityManager.query(
      'SELECT ' +
        'C.product_id, ' +
        'C.product_name, ' +
        'A.product_balance_id, ' +
        'B.qty ' +
        'FROM in_product_balance A ' +
        'JOIN in_product_balance_stock B ON A.product_balance_id = B.product_balance_id ' +
        'JOIN m_product C ON A.product_id = C.product_id ' +
        'WHERE C.product_id = $1 ',
      [id],
    );

    if (!limit) {
      limit = 30;
    }

    if (!offset) {
      offset = 1;
    }

    const rawDetailData = await this.entityManager.query(
      'SELECT ' +
        'A.ref_doc_no, ' +
        'A.ref_doc_date, ' +
        'A.qty, ' +
        'B.product_id, ' +
        'B.product_name, ' +
        'B.product_name, ' +
        'C.doc_type_id, ' +
        'C.doc_code, ' +
        'C.doc_desc ' +
        'FROM in_log_product_balance_stock A ' +
        'JOIN m_product B ON A.product_id = B.product_id ' +
        'JOIN m_document C ON A.ref_doc_type_id = C.doc_type_id ' +
        'WHERE A.product_id = $1 ' +
        'ORDER BY ref_doc_date DESC ' +
        `LIMIT ${limit} OFFSET ${offset} `,
      [id],
    );

    return {
      header: rawHeaderData[0],
      history_log: rawDetailData,
    };
  }
}
