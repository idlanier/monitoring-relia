import { Controller, Get, Query } from '@nestjs/common';
import { ProductService } from './product.service';

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
}
