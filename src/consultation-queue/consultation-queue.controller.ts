import { Controller, Get, Query } from '@nestjs/common';
import { ConsultationQueueService } from './consultation-queue.service';
import { AuthJwtGuard } from 'src/auth/auth.decorator';

@AuthJwtGuard()
@Controller('queue')
export class ConsultationQueueController {
  constructor(
    private readonly consultationQueueService: ConsultationQueueService,
  ) {}

  @Get('list')
  getConsultationQueueByDate(@Query() queryParam: any) {
    return this.consultationQueueService.getConsultationQueueByDate(
      queryParam.date,
    );
  }
}
