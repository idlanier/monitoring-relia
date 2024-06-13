import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { LoginDTO } from './dto/login.dto';
import { HashService } from 'src/common/hash.service';
import { UserService } from 'src/user/user.service';
import { JWTPayloadDTO } from 'src/auth/dto/jwt-payload.dto';

@Injectable()
export class LoginService {
  constructor(
    private readonly userService: UserService,
    private readonly hashService: HashService,
    private readonly authService: AuthService,
  ) {}

  logger = new Logger('Login Service');

  async loginByUsername(
    loginDto: LoginDTO,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const user = await this.userService.findOneByUsername(
      loginDto.username,
      true,
    );

    if (!user) {
      throw new BadRequestException('Invalid');
    }

    const validate: boolean = await this.hashService.bcryptComparePassword(
      loginDto.pin,
      user.pin,
    );

    if (!validate) {
      throw new BadRequestException('Invalid');
    }

    const dataToken: JWTPayloadDTO = {
      userId: user.id,
      fullname: user.fullname,
      username: user.username,
    };

    return this.authService.generateToken(dataToken);
  }

  async refreshToken(user: JWTPayloadDTO): Promise<string> {
    return this.authService.generateRefreshToken(user);
  }
}
