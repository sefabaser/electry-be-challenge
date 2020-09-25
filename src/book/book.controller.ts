import { Controller, UseGuards, Get, Req, Post, Query, Put, Delete } from '@nestjs/common';
import { Request } from 'express';

import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Book, BookQuery, GetBookRequest } from 'src/book/_interfaces';
import { BookService } from 'src/book/services/book.service';
import { User } from 'src/users/_interfaces';

@Controller('book')
export class BookController {
  constructor(private bookService: BookService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  getBook(@Req() req: Request, @Query() query: GetBookRequest): Book {
    // TODO: validation
    let user = <User>req.user;
    return this.bookService.getBook(user.username, query.title);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  postBook(@Req() req: Request, @Query() bookQuery: BookQuery): void {
    // TODO: validation
    let book = this.mapBookQueryToBook(req, bookQuery);
    this.bookService.createBook(book);
  }

  @Put()
  @UseGuards(JwtAuthGuard)
  putBook(@Req() req: Request, @Query() bookQuery: BookQuery): Book {
    // TODO: validation
    let book = this.mapBookQueryToBook(req, bookQuery);
    return this.bookService.updateBook(book);
  }

  @Delete()
  @UseGuards(JwtAuthGuard)
  deleteBook(@Req() req: Request, @Query() bookQuery: BookQuery): Book {
    // TODO: validation
    let book = this.mapBookQueryToBook(req, bookQuery);
    return this.bookService.deleteBook(book);
  }

  private mapBookQueryToBook(req: Request, bookQuery: BookQuery): Book {
    let user = <User>req.user;
    let book = <Book>bookQuery;
    book.author = user.username;
    return book;
  }
}
