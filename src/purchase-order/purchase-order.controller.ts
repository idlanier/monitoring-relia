import { Controller, Get, Param, Query } from '@nestjs/common';
import { PurchaseOrderService } from './purchase-order.service';
import { GetPurchaseValueByDateDTO } from './dto/getRevenueByDate.dto';

@Controller('po')
export class PurchaseOrderController {
  constructor(private readonly purchaseOrderService: PurchaseOrderService) {}

  @Get('list')
  getPurchaseOrderByDateRange(@Query() queryParam: any) {
    return this.purchaseOrderService.getPurchaseOrderByDateRange(
      queryParam.start_date,
      queryParam.end_date,
      queryParam.product_id,
    );
  }

  @Get('detail/:id')
  findPurchaseOrderDetailedById(@Param('id') id: number) {
    return this.purchaseOrderService.findPurchaseOrderDetailedById(id);
  }

  @Get('/year/purchase')
  getCurrentYearPurchase(@Query() queryParam: any) {
    return this.purchaseOrderService.getCurrentYearPurchase(
      queryParam.product_id,
    );
  }

  @Get('/month/purchase')
  getCurrentMonthPurchase(@Query() queryParam: any) {
    return this.purchaseOrderService.getCurrentMonthPurchase(
      queryParam.product_id,
    );
  }

  @Get('/custom/purchase')
  getPurchaseValueByDate(
    @Query() getPurchaseValueByDateDTO: GetPurchaseValueByDateDTO,
  ) {
    return this.purchaseOrderService.getPurchaseValueByDate(
      getPurchaseValueByDateDTO,
    );
  }
}
