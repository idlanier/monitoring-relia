import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { JWTPayloadDTO } from '../dto/jwt-payload.dto';
import { ConfigService } from '@nestjs/config';
import * as moment from 'moment';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.getOrThrow('AUTH_JWTSECRETKEY'),
    });
  }

  async validate(payload: JWTPayloadDTO) {
    if (this.isExpired(payload)) {
      throw new ForbiddenException('Forbidden Access');
    }
    return payload;
  }

  private isExpired(payload: JWTPayloadDTO) {
    return payload.exp < moment().unix();
  }
}
