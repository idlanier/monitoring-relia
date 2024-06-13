import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt/jwt.strategy';
import { AuthService } from './auth.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([]),
    ConfigModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secretOrPrivateKey: configService.getOrThrow('AUTH_JWTSECRETKEY'),
        secret: configService.getOrThrow('AUTH_JWTSECRETKEY'),
        signOptions: {
          expiresIn: configService.getOrThrow('AUTH_JWTEXPIRATIONTIME'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [JwtStrategy, AuthService],
  exports: [JwtModule, PassportModule, AuthService],
})
export class AuthModule {}
