import { Controller, Get, Param, Query } from '@nestjs/common';
import { PurchaseOrderService } from './purchase-order.service';

@Controller('po')
export class PurchaseOrderController {
  constructor(private readonly purchaseOrderService: PurchaseOrderService) {}

  @Get('list')
  getPurchaseOrderByDateRange(@Query() queryParam: any) {
    return this.purchaseOrderService.getPurchaseOrderByDateRange(
      queryParam.start_date,
      queryParam.end_date,
    );
  }

  @Get('detail/:id')
  findPurchaseOrderDetailedById(@Param('id') id: number) {
    return this.purchaseOrderService.findPurchaseOrderDetailedById(id);
  }
}
