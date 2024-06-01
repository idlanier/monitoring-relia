import { Module } from '@nestjs/common';
import { ReceiveGoodsController } from './receive-goods.controller';
import { ReceiveGoodsService } from './receive-goods.service';

@Module({
  controllers: [ReceiveGoodsController],
  providers: [ReceiveGoodsService],
})
export class ReceiveGoodsModule {}
