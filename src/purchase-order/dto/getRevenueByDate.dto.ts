import { IsDateString, IsOptional } from 'class-validator';

export class GetPurchaseValueByDateDTO {
  @IsDateString()
  start_date: Date | String;

  @IsDateString()
  end_date: Date | String;

  @IsOptional()
  product_id?: number;
}
