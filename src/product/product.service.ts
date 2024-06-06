import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {}

  async getProductList(product_name: string, limit: number, offset: number) {
    let query =
      ' SELECT ' +
      ' A.product_id, ' +
      ' A.product_code, ' +
      ' A.product_name, ' +
      ' B.ctgr_product_id, ' +
      ' B.ctgr_product_code, ' +
      ' B.ctgr_product_name, ' +
      ' C.sub_ctgr_product_id, ' +
      ' C.sub_ctgr_product_code, ' +
      ' C.sub_ctgr_product_name ' +
      ' FROM ' +
      ' m_product A ' +
      ' JOIN m_ctgr_product B ON A.ctgr_product_id = B.ctgr_product_id ' +
      ' JOIN m_sub_ctgr_product C ON A.sub_ctgr_product_id = C.sub_ctgr_product_id ' +
      " WHERE A.product_name ILIKE '%" +
      product_name +
      "%' ";

    if (limit && offset) {
      query += 'LIMIT ' + limit + ' OFFSET ' + offset;
    } else {
      query += 'LIMIT 10 OFFSET 0';
    }

    const params = [];

    const rawData = await this.entityManager.query(query, params);

    return rawData;
  }

  async getLatestPOPriceProduct(
    product_id: number,
    limit: number,
    offset: number,
  ) {
    let query =
      ' SELECT ' +
      ' A.po_id, ' +
      ' A.qty, ' +
      ' A.unit_price, ' +
      ' A.item_amount_gross, ' +
      ' A.create_datetime, ' +
      ' B.product_id, ' +
      ' B.product_name, ' +
      ' C.doc_no, ' +
      ' C.doc_date, ' +
      ' D.supplier_name, ' +
      ' E.supplier_name as principal_name ' +
      ' FROM pu_po_item A ' +
      ' JOIN m_product B ON A.product_id = B.product_id ' +
      ' JOIN pu_po C ON A.po_id = C.po_id ' +
      ' JOIN m_supplier D ON C.supplier_id = D.supplier_id ' +
      ' JOIN m_supplier E ON C.factory_supplier_id = E.supplier_id ' +
      ' WHERE B.product_id = ' +
      product_id +
      ' ORDER BY A.create_datetime DESC ';

    if (limit && offset) {
      query += 'LIMIT ' + limit + ' OFFSET ' + offset;
    } else {
      query += 'LIMIT 10 OFFSET 0';
    }

    const params = [];

    const rawData = await this.entityManager.query(query, params);

    return rawData;
  }

  async getLatestSellPriceProduct(
    product_id: number,
    limit: number,
    offset: number,
  ) {
    let query =
      ' SELECT  ' +
      ' A.unit_sell_price, ' +
      ' A.qty, ' +
      ' B.pos_id, ' +
      ' B.doc_no, ' +
      ' B.doc_date, ' +
      ' D.full_name as salesman_name ' +
      ' FROM trx_pos_item A  ' +
      ' JOIN trx_pos B ON A.pos_id = B.pos_id ' +
      ' JOIN m_product C ON A.product_id = C.product_id ' +
      ' JOIN m_salesman D ON A.salesman_id = D.salesman_id ' +
      ' WHERE A.product_id = ' +
      product_id +
      ' ORDER BY A.create_datetime DESC ';

    if (limit && offset) {
      query += 'LIMIT ' + limit + ' OFFSET ' + offset;
    } else {
      query += 'LIMIT 10 OFFSET 0';
    }

    const params = [product_id];

    const rawData = await this.entityManager.query(query, params);

    return rawData;
  }

  async getLatestStockProductMovement(
    product_id: number,
    limit: number,
    offset: number,
  ) {
    let query =
      ' SELECT ' +
      ' A.create_datetime, ' +
      ' A.qty, ' +
      ' A.ref_doc_no, ' +
      ' B.doc_code, ' +
      ' B.doc_desc, ' +
      ' C.product_id, ' +
      ' C.product_name, ' +
      ' D.warehouse_name ' +
      ' FROM in_log_product_balance_stock A ' +
      ' JOIN m_document B ON A.ref_doc_type_id = B.doc_type_id ' +
      ' JOIN m_product C ON A.product_id = C.product_id ' +
      ' JOIN m_warehouse D ON A.warehouse_id = D.warehouse_id ' +
      ' WHERE C.product_id = ' +
      product_id +
      ' ORDER BY A.create_datetime DESC ';

    if (limit && offset) {
      query += 'LIMIT ' + limit + ' OFFSET ' + offset;
    } else {
      query += 'LIMIT 10 OFFSET 0';
    }

    const params = [product_id];

    const rawData = await this.entityManager.query(query, params);

    return rawData;
  }
}
