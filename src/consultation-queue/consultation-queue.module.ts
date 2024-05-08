import { Module } from '@nestjs/common';
import { ConsultationQueueService } from './consultation-queue.service';
import { ConsultationQueueController } from './consultation-queue.controller';

@Module({
  controllers: [ConsultationQueueController],
  providers: [ConsultationQueueService],
})
export class ConsultationQueueModule {}
