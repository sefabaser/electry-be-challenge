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

    // TODO: update to "fake db connection" after having the db
    let bookService = moduleFixture.get(BookService);
    (<any>bookService).books = [Book1];

    app = await UnitTestHelper.initTestApp(moduleFixture);
  });

  it('GET: /book', () => {
    return request(app.getHttpServer())
      .get('/book')
      .query({ title: 'order 66' })
      .expect(200)
      .expect(Book1);
  });

  it('POST: /book', () => {
    let newBookRequest = {
      title: 'cook book of ewoks',
      description: 'Delicious ewok recepies.',
      coverImage: 'http://something.png',
      price: 50
    };

    return request(app.getHttpServer())
      .post('/book')
      .query(newBookRequest)
      .expect(201)
      .expect({
        ...newBookRequest,
        author: MockUser.username
      });
  });

  it('PUT: /book', () => {
    let updateBookRequest = {
      title: 'order 66',
      description: 'new history of clone wars',
      coverImage: 'http://something.png',
      price: 250
    };

    return request(app.getHttpServer())
      .put('/book')
      .query(updateBookRequest)
      .expect(200)
      .expect({
        ...updateBookRequest,
        author: MockUser.username
      });
  });
});
