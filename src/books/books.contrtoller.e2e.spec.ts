import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';

import { AppModule } from 'src/app.module';
import { JwtAuthGuard, JwtStrategy } from 'src/auth/guards/jwt-auth.guard';
import { BooksService } from 'src/books/services/books.service';
import { Book } from 'src/book/_models';

const Book1: Book = {
  title: 'order 66',
  description: 'history of clone wars',
  coverImage: 'http://something.png',
  price: 200,
  author: 'Lohgarra'
};

const MockBooks: Book[] = [Book1];

describe('FlightsController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    })
      .overrideProvider(JwtStrategy)
      .useValue({
        vaildate: () => {
          userId: 1;
          username: 'TestUser';
          password: 'TestPass';
        }
      })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: () => true })
      .overrideProvider(BooksService)
      .useValue({ getBooks: () => MockBooks })
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('GET: /books', () => {
    return request(app.getHttpServer())
      .get('/books')
      .expect(200)
      .expect(MockBooks);
  });
});
