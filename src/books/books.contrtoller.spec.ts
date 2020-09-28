import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';

import { AppModule } from 'src/app.module';
import { BooksService } from 'src/books/services/books.service';
import { Book } from 'src/book/_models';
import { UnitTestHelper } from 'src/utilities/unit-test.helper';

const Book1: Book = {
  title: 'order 66',
  description: 'history of clone wars',
  coverImage: 'http://something.png',
  price: 200,
  author: 'Lohgarra'
};

const MockBooks: Book[] = [Book1];

describe('Books Controller', () => {
  let app: INestApplication;

  beforeEach(async () => {
    let moduleFixture: TestingModule = await UnitTestHelper.overrideAuth(
      Test.createTestingModule({
        imports: [AppModule]
      })
    )
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
