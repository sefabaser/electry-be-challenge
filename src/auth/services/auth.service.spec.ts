import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from 'src/auth/services/auth.service';
import { UsersService } from 'src/users/services/users.service';

const SampleUser = {
  userId: 1,
  username: 'Lohgarra'
};

describe('Auth Service', () => {
  let mockUsersService: UsersService;
  let mockJwtService: JwtService;
  let usersService: AuthService;

  beforeEach(() => {
    mockUsersService = <any>{
      validateAndReturnUser: jest.fn()
    };
    mockJwtService = <any>{
      sign: jest.fn()
    };

    usersService = new AuthService(mockUsersService, mockJwtService);
  });

  test('login with correct credentials', async () => {
    (<jest.Mock>mockUsersService.validateAndReturnUser).mockReturnValueOnce(SampleUser);
    (<jest.Mock>mockJwtService.sign).mockReturnValueOnce('sampleSignature');
    let result = await usersService.login({ username: 'Lohgarra', password: 'pasword' });
    expect(result).toStrictEqual({ accessToken: 'sampleSignature' });
  });

  test('login with wrong credentials', async () => {
    (<jest.Mock>mockUsersService.validateAndReturnUser).mockReturnValueOnce(undefined);
    (<jest.Mock>mockJwtService.sign).mockReturnValueOnce('sampleSignature');
    await expect(usersService.login({ username: 'wrong', password: 'pasword' })).rejects.toStrictEqual(new UnauthorizedException());
  });
});
