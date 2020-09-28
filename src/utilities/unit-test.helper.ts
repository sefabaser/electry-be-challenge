import { ExecutionContext } from '@nestjs/common';
import { TestingModuleBuilder } from '@nestjs/testing';
import { JwtAuthGuard, JwtStrategy } from 'src/auth/guards/jwt-auth.guard';
import { User } from 'src/users/_models';

export const MockUser: User = {
  userId: 1,
  username: 'TestUser',
  password: 'TestPass'
};

export class UnitTestHelper {
  static overrideAuth(testingModuleBuilder: TestingModuleBuilder): TestingModuleBuilder {
    return testingModuleBuilder
      .overrideGuard(JwtAuthGuard)
      .useValue({
        canActivate: (context: ExecutionContext) => {
          const req = context.switchToHttp().getRequest();
          req.user = MockUser;
          return true;
        }
      })
      .overrideProvider(JwtStrategy)
      .useValue({
        vaildate: () => MockUser
      });
  }
}
