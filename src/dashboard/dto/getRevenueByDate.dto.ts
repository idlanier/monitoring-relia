import { IsDateString } from 'class-validator';

export class GetRevenueByDateDTO {
  @IsDateString()
  start_date: Date | String;

  @IsDateString()
  end_date: Date | String;
}
