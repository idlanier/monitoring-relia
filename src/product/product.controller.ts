import { Controller, Get, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { AuthJwtGuard } from 'src/auth/auth.decorator';

@AuthJwtGuard()
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('list')
  getProductList(@Query() queryParam: any) {
    return this.productService.getProductList(
      queryParam.product_name,
      queryParam.limit,
      queryParam.offset,
    );
  }

  @Get('history/po/list')
  getLatestPOPriceProduct(@Query() queryParam: any) {
    return this.productService.getLatestPOPriceProduct(
      queryParam.product_id,
      queryParam.limit,
      queryParam.offset,
    );
  }

  @Get('history/transaction/list')
  getLatestSellPriceProduct(@Query() queryParam: any) {
    return this.productService.getLatestSellPriceProduct(
      queryParam.product_id,
      queryParam.limit,
      queryParam.offset,
    );
  }

  @Get('history/stock/list')
  getLatestStockProductMovement(@Query() queryParam: any) {
    return this.productService.getLatestStockProductMovement(
      queryParam.product_id,
      queryParam.limit,
      queryParam.offset,
    );
  }
}
