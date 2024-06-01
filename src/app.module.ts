import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { DashboardModule } from './dashboard/dashboard.module';
import { ConsultationQueueModule } from './consultation-queue/consultation-queue.module';
import { PurchaseOrderModule } from './purchase-order/purchase-order.module';
import { TransactionModule } from './transaction/transaction.module';
import { ReceiveGoodsModule } from './receive-goods/receive-goods.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      password: process.env.DB_PASSWORD,
      username: process.env.DB_USERNAME,
      entities: [],
      database: process.env.DB_DATABASE,
      synchronize: false,
      logging: true,
    }),
    DashboardModule,
    ConsultationQueueModule,
    PurchaseOrderModule,
    TransactionModule,
    ReceiveGoodsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
