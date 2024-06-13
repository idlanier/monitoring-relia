import { Controller, Get, Param, Query } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { AuthJwtGuard } from 'src/auth/auth.decorator';

@AuthJwtGuard()
@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Get('list')
  getTransactionByDateRange(@Query() queryParam: any) {
    return this.transactionService.getTransactionByDateRange(
      queryParam.start_date,
      queryParam.end_date,
      queryParam.product_id,
    );
  }

  @Get('detail/:id')
  findTransactionDetailedById(@Param('id') id: number) {
    return this.transactionService.findTransactionDetailedById(id);
  }
}
