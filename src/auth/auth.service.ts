import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AccessTokenDTO } from './dto/access-token.dto';
import { JWTPayloadDTO } from './dto/jwt-payload.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private jwtService: JwtService,
  ) {}

  async generateAccessToken(payload: JWTPayloadDTO): Promise<string> {
    return this.jwtService.signAsync(payload, {
      expiresIn: this.configService.getOrThrow('AUTH_JWTEXPIRATIONTIME'),
      secret: this.configService.getOrThrow('AUTH_JWTSECRETKEY'),
    });
  }

  async generateRefreshToken(payload: JWTPayloadDTO): Promise<string> {
    return this.jwtService.signAsync(payload, {
      expiresIn: this.configService.getOrThrow('AUTH_REFRESHJWTEXPIRATIONTIME'),
      secret: this.configService.getOrThrow('AUTH_JWTSECRETKEY'),
    });
  }

  async validateAccessToken(token: string): Promise<Record<string, any>> {
    const authJwtTokenSecret =
      this.configService.getOrThrow('AUTH_JWTSECRETKEY');
    return this.jwtService.verify(token, {
      secret: authJwtTokenSecret,
      ignoreExpiration: true,
    });
  }

  async generateToken(payload: JWTPayloadDTO): Promise<AccessTokenDTO> {
    const dailyToken: string = await this.generateAccessToken(payload);
    if (!dailyToken) {
      throw new BadRequestException('Unauthorized');
    }
    const refreshToken: string = await this.generateRefreshToken(payload);
    if (!refreshToken) {
      throw new BadRequestException('Unauthorized');
    }

    return {
      accessToken: dailyToken,
      refreshToken: refreshToken,
    };
  }
}
