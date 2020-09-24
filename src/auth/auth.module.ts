import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { LocalStrategy } from './guards/local.strategy';
import { JwtStrategy } from './guards/jwt.strategy';
import { UsersModule } from '../users/users.module';
import { JwtConstants } from './constants';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: JwtConstants.secret,
      signOptions: { expiresIn: '600s' }
    })
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService]
})
export class AuthModule {}