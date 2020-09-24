import { Controller, Get, Query } from '@nestjs/common';
import { Book } from 'src/book/interfaces';
import { GetBooksRequest } from 'src/books/interfaces';
import { BooksService } from 'src/books/services/books.service';

@Controller('books')
export class BooksController {
  constructor(private booksService: BooksService) {}

  @Get()
  getBooks(@Query() query: GetBooksRequest): Book[] {
    // TODO: validation
    return this.booksService.getBooks(query);
  }
}
