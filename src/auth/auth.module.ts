import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { UsersModule } from 'src/users/users.module';
import { AuthService } from 'src/auth/services/auth.service';
import { Config } from 'src/config';
import { AuthController } from 'src/auth/auth.controller';
import { JwtStrategy } from 'src/auth/guards/jwt-auth.guard';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: Config.secret,
      signOptions: { expiresIn: Config.loginDuration }
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService]
})
export class AuthModule {}
