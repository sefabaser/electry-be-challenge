import { Controller, UseGuards, Get, Request, Post, Query, Put, Delete } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Book, GetBookRequest } from 'src/book/interfaces';
import { BookService } from 'src/book/services/book.service';

@Controller('book')
export class BookController {
  constructor(private bookService: BookService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getBook(@Request() req, @Query() query: GetBookRequest): Book {
    // TODO: validation
    return this.bookService.getBook(req.user.username, query.title);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  postBook(@Request() req, @Query() bookWithoutAuthor: Omit<Book, 'author'>): void {
    // TODO: validation
    let book = <Book>bookWithoutAuthor;
    book.author = req.user.username;
    this.bookService.createBook(book);
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  putBook(@Request() req, @Query() bookWithoutAuthor: Omit<Book, 'author'>): Book {
    // TODO: validation
    let book = <Book>bookWithoutAuthor;
    book.author = req.user.username;
    return this.bookService.updateBook(book);
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  deleteBook(@Request() req, @Query() bookWithoutAuthor: Omit<Book, 'author'>): Book {
    // TODO: validation
    let book = <Book>bookWithoutAuthor;
    book.author = req.user.username;
    return this.bookService.deleteBook(book);
  }
}
