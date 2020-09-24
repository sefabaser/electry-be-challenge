import { Injectable } from '@nestjs/common';
import { Book } from '../book/interfaces';
import { BookService } from '../book/book.service';
import { BooksSearchQuery as GetBooksRequest } from '../books/interfaces';

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
