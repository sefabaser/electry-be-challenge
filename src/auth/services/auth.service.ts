import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { LoginRequest, LoginResponse } from 'src/auth/_models';
import { UsersService } from 'src/users/services/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async login(loginRequest: LoginRequest): Promise<LoginResponse> {
    let user = this.usersService.validateAndReturnUser(loginRequest.username, loginRequest.password);
    if (!user) {
      throw new UnauthorizedException();
    }

    return { accessToken: this.jwtService.sign(user) };
  }
}
