import {
  ExecutionContext,
  UseGuards,
  applyDecorators,
  createParamDecorator,
} from '@nestjs/common';
import { JwtGuard } from './jwt/jwt.guard';
import { JWTPayloadDTO } from './dto/jwt-payload.dto';

export const User = createParamDecorator(
  (data: string, ctx: ExecutionContext): Record<string, any> => {
    const { user } = ctx.switchToHttp().getRequest();
    const response = data ? user[data] : user;
    return response as JWTPayloadDTO;
  },
);

export function AuthJwtGuard() {
  return applyDecorators(UseGuards(JwtGuard));
}
