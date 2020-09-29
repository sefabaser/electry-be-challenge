import { Controller, Post, Query } from '@nestjs/common';

import { AuthService } from 'src/auth/services/auth.service';
import { LoginRequest, LoginResponse } from 'src/auth/_models';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Query() loginRequest: LoginRequest): Promise<LoginResponse> {
    // TODO: encrypt password
    return this.authService.login(loginRequest);
  }
}
