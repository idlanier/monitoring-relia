import { Controller, Get, Param, Query } from '@nestjs/common';
import { StockService } from './stock.service';
import { AuthJwtGuard } from 'src/auth/auth.decorator';

@AuthJwtGuard()
@Controller('stock')
export class StockController {
  constructor(private readonly stockService: StockService) {}

  @Get('list')
  getStockList(@Query() queryParam: any) {
    return this.stockService.getStockList(
      queryParam.limit,
      queryParam.offset,
      queryParam.product_id,
    );
  }

  @Get('detail/:id')
  getProductStockDetail(@Param('id') id: number, @Query() queryParam: any) {
    return this.stockService.getProductStockDetail(
      id,
      queryParam.limit,
      queryParam.offset,
    );
  }
}
