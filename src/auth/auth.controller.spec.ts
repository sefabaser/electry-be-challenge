import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';

import { AppModule } from 'src/app.module';
import { MockUser, UnitTestHelper } from 'src/utilities/unit-test.helper';
import { UsersService } from 'src/users/services/users.service';

describe('Book Controller', () => {
  let app: INestApplication;

  beforeEach(async () => {
    let moduleFixture: TestingModule = await UnitTestHelper.overrideAuth(
      Test.createTestingModule({
        imports: [AppModule]
      })
    ).compile();

    // TODO: update to "fake db connection" after having the db
    let usersService = moduleFixture.get(UsersService);
    (<any>usersService).users = [MockUser];

    app = await UnitTestHelper.initTestApp(moduleFixture);
  });

  it('POST: /auth/login', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .query({ username: MockUser.username, password: MockUser.password })
      .expect(201);
  });

  it('POST: /auth/login, not valid password', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .query({ username: MockUser.username, password: 'wrongPass' })
      .expect(401);
  });
});
