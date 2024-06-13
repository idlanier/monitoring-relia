import { Module, forwardRef } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { AuthService } from '../auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { HashService } from 'src/common/hash.service';

@Module({
  imports: [forwardRef(() => UserModule)],
  controllers: [LoginController],
  providers: [LoginService, HashService, AuthService, JwtService],
})
export class LoginModule {}
