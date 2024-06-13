import {
  Injectable,
  ExecutionContext,
  Logger,
  InternalServerErrorException,
  UnauthorizedException,
  HttpStatus,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { JWTPayloadDTO } from '../dto/jwt-payload.dto';
import { TokenExpiredError } from 'jsonwebtoken';

@Injectable()
export class JwtGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }
  private permission: string;

  canActivate(
    context: ExecutionContext,
  ): Promise<boolean> | boolean | Observable<boolean> {
    const permissionsHandler = this.reflector.get<string[]>(
      'permission',
      context.getHandler(),
    );

    this.permission = permissionsHandler ? permissionsHandler[0] : null;
    return super.canActivate(context);
  }

  handleRequest(err: Error, user: any, info: Error) {
    const logger = new Logger('Handling Request JWT');
    if (err) {
      throw new InternalServerErrorException(err);
    }
    const loggedInUser: JWTPayloadDTO = user;

    if (!loggedInUser) {
      let error_message = 'Invalid Token';
      if (info instanceof TokenExpiredError) {
        error_message = 'Expired Token';
      }

      logger.error('AuthJwtGuardError.Unauthorize', '', this.constructor.name);
      throw new UnauthorizedException('Unauthorized');
    }

    return user;
  }
}
