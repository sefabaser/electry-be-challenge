import { Injectable } from '@nestjs/common';
import { Book } from 'src/book/_models';
import { GetBooksRequest } from 'src/books/_models';
import { BookService } from 'src/book/services/book.service';

@Injectable()
export class BooksService {
  constructor(private bookService: BookService) {}

  getBooks(query: GetBooksRequest): Book[] {
    let books = this.bookService.getAllBooks();

    if (query.author) {
      books = books.filter(book => book.author === query.author);
    }

    if (query.minPrice) {
      books = books.filter(book => book.price >= query.minPrice);
    }

    if (query.maxPrice) {
      books = books.filter(book => book.price <= query.maxPrice);
    }

    return books;
  }
}
