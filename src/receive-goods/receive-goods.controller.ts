import { Controller, Get, Param, Query } from '@nestjs/common';
import { ReceiveGoodsService } from './receive-goods.service';
import { AuthJwtGuard } from 'src/auth/auth.decorator';

@AuthJwtGuard()
@Controller('receive-goods')
export class ReceiveGoodsController {
  constructor(private readonly receiveGoodsService: ReceiveGoodsService) {}

  @Get('list')
  getReceiveGoodsByDateRange(@Query() queryParam: any) {
    return this.receiveGoodsService.getReceiveGoodsByDateRange(
      queryParam.start_date,
      queryParam.end_date,
      queryParam.limit,
      queryParam.offset,
      queryParam.product_id,
      queryParam.ext_doc_no,
    );
  }

  @Get('detail/:id')
  findReceiveGoodsDetailedById(@Param('id') id: number) {
    return this.receiveGoodsService.findReceiveGoodsDetailedById(id);
  }
}
