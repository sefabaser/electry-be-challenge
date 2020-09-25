import { Controller, Get, Query } from '@nestjs/common';
import { Book } from 'src/book/_models';
import { GetBooksRequest } from 'src/books/_models';
import { BooksService } from 'src/books/services/books.service';

@Controller('books')
export class BooksController {
  constructor(private booksService: BooksService) {}

  @Get()
  getBooks(@Query() query: GetBooksRequest): Book[] {
    return this.booksService.getBooks(query);
  }
}
