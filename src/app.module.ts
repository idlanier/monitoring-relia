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
import { StockModule } from './stock/stock.module';
import { ProductModule } from './product/product.module';
import { PatientModule } from './patient/patient.module';
import { MedicalRecordModule } from './medical-record/medical-record.module';
import { UserModule } from './user/user.module';
import { LoginModule } from './login/login.module';
import { User } from './user/entity/user.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      password: process.env.DB_PASSWORD,
      username: process.env.DB_USERNAME,
      entities: [User],
      database: process.env.DB_DATABASE,
      synchronize: false,
      logging: true,
    }),
    DashboardModule,
    ConsultationQueueModule,
    PurchaseOrderModule,
    TransactionModule,
    ReceiveGoodsModule,
    StockModule,
    ProductModule,
    PatientModule,
    MedicalRecordModule,
    AuthModule,
    UserModule,
    LoginModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
