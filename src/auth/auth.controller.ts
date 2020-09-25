import { Controller, UseGuards, Req, Post } from '@nestjs/common';
import { Request } from 'express';

import { LocalAuthGuard } from 'src/auth/guards/local-auth.guard';
import { AuthService } from 'src/auth/services/auth.service';
import { LoginResponse } from 'src/auth/_interfaces';
import { User } from 'src/users/_interfaces';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req: Request): Promise<LoginResponse> {
    let user = <User>req.user;
    return this.authService.login(user);
  }
}
