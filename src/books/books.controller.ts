import { Controller, Get, Query } from '@nestjs/common';
import { Book } from 'src/book/interfaces';
import { BooksService } from 'src/books/books.service';
import { BooksSearchQuery } from 'src/books/interfaces';

@Controller('books')
export class BooksController {
  constructor(private booksService: BooksService) {}

  @Get()
  getBooks(@Query() query: BooksSearchQuery): Book[] {
    // TODO: validation
    return this.booksService.getBooks(query);
  }
}
