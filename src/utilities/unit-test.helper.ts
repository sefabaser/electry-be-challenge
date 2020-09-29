import { ExecutionContext, ValidationPipe } from '@nestjs/common';
import { TestingModule, TestingModuleBuilder } from '@nestjs/testing';
import { JwtAuthGuard, JwtStrategy } from 'src/auth/guards/jwt-auth.guard';
import { User } from 'src/users/_models';
import { ContentTypeInterceptor } from 'src/utilities/content-type.interceptor';

export const MockUser: User = {
  userId: 1,
  username: 'TestUser',
  password: 'TestPass'
};

export class UnitTestHelper {
  static async initTestApp(moduleFixture: TestingModule) {
    let app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true
      })
    );
    app.useGlobalInterceptors(new ContentTypeInterceptor());
    return app.init();
  }

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
