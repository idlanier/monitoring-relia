import { Controller, Get, Query } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { GetRevenueByDateDTO } from './dto/getRevenueByDate.dto';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('/year/revenue')
  getCurrentYearRevenue() {
    return this.dashboardService.getCurrentYearRevenue();
  }

  @Get('/month/revenue')
  getCurrentMonthRevenue() {
    return this.dashboardService.getCurrentMonthRevenue();
  }

  @Get('/day/revenue')
  getCurrentDayRevenue() {
    return this.dashboardService.getCurrentDayRevenue();
  }

  @Get('/day/last7/revenue')
  getLast7DaysRevenue() {
    return this.dashboardService.getLast7DaysRevenue();
  }

  @Get('/custom/revenue')
  getRevenueByDate(@Query() getRevenueByDateDTO: GetRevenueByDateDTO) {
    return this.dashboardService.getRevenueByDate(getRevenueByDateDTO);
  }

  @Get('/year/revenue/compact')
  getCurrentYearDetailedRevenue() {
    return this.dashboardService.getCurrentYearDetailedRevenue();
  }

  @Get('/year/most/product/sales')
  getCurrentYearMostSoldProductBySales() {
    return this.dashboardService.getCurrentYearMostSoldProductBySales();
  }

  @Get('/year/most/product/volume')
  getCurrentYearMostSoldProductByQuantity() {
    return this.dashboardService.getCurrentYearMostSoldProductByQuantity();
  }

  @Get('/month/most/product/sales')
  getCurrentMonthMostSoldProductBySales() {
    return this.dashboardService.getCurrentMonthMostSoldProductBySales();
  }

  @Get('/month/most/product/volume')
  getCurrentMonthMostSoldProductByQuantity() {
    return this.dashboardService.getCurrentMonthMostSoldProductByQuantity();
  }

  @Get('/day/queue')
  getCurrentDayQueue() {
    return this.dashboardService.getCurrentDayQueue();
  }

  @Get('/day/vs')
  getCurrentDayTotalOrderVsTotalPayment() {
    return this.dashboardService.getCurrentDayTotalOrderVsTotalPayment();
  }
}
