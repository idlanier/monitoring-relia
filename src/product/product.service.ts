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
    console.info('PRODUCT NAME', product_name);
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
}
