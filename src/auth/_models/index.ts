import { IsString } from 'class-validator';

export class LoginRequest {
  @IsString()
  username: string;

  @IsString()
  password: string;
}

export interface LoginResponse {
  accessToken: string;
}
