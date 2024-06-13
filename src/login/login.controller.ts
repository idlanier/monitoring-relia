import { Body, Controller, Post } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginDTO } from './dto/login.dto';

@Controller('auth')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post('login')
  async loginByUsername(
    @Body() params: LoginDTO,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    return await this.loginService.loginByUsername(params);
  }
}
