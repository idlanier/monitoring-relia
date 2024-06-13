import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDTO {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  pin: string;
}
