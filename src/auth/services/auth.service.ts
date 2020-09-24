import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginResponse } from 'src/auth/_interfaces';

import { User } from 'src/users/interfaces';
import { UsersService } from 'src/users/services/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async validateUser(username: string, pass: string): Promise<User | false> {
    let user = await this.usersService.findOne(username);
    if (user && user.password === pass) {
      let { password, ...result } = user;
      return result;
    }
    return false;
  }

  async login(user: User): Promise<LoginResponse> {
    return {
      accessToken: this.jwtService.sign(user)
    };
  }
}
