import { IsArray, IsNumber, IsString } from 'class-validator';

export class JWTPayloadDTO {
  @IsNumber()
  userId: number;

  @IsString()
  fullname: string;

  @IsString()
  username: string;

  iat?: number;

  exp?: number;
}
