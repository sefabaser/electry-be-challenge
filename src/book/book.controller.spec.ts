import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';

import { AppModule } from 'src/app.module';
import { Book } from 'src/book/_models';
import { MockUser, UnitTestHelper } from 'src/utilities/unit-test.helper';
import { BookService } from 'src/book/services/book.service';

const Book1: Book = {
  title: 'order 66',
  description: 'history of clone wars',
  coverImage: 'http://something.png',
  price: 200,
  author: MockUser.username
};

describe('Book Controller', () => {
  let app: INestApplication;

  beforeEach(async () => {
    let moduleFixture: TestingModule = await UnitTestHelper.overrideAuth(
      Test.createTestingModule({
        imports: [AppModule]
      })
    ).compile();

    let bookService = moduleFixture.get(BookService);
    (<any>bookService).books = [Book1];
    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('GET: /book', () => {
    return request(app.getHttpServer())
      .get('/book?title=order 66')
      .expect(200)
      .expect(Book1);
  });
});
