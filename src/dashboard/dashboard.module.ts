import { Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { DashboardDonerdiService } from './dashboard-donerdi.service';
import { DashboardDonerdiController } from './dashboard-donerdi.controller';

@Module({
  controllers: [DashboardController, DashboardDonerdiController],
  providers: [DashboardService, DashboardDonerdiService],
})
export class DashboardModule {}
