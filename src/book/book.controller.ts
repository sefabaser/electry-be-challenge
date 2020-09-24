import { Controller, UseGuards, Get, Req, Post, Query, Put, Delete } from '@nestjs/common';
import { Request } from 'express';

import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Book, GetBookRequest } from 'src/book/interfaces';
import { BookService } from 'src/book/services/book.service';
import { User } from 'src/users/interfaces';

@Controller('book')
export class BookController {
  constructor(private bookService: BookService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getBook(@Req() req: Request, @Query() query: GetBookRequest): Book {
    // TODO: validation
    let user = <User>req.user;
    return this.bookService.getBook(user.username, query.title);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  postBook(@Req() req: Request, @Query() bookWithoutAuthor: Omit<Book, 'author'>): void {
    // TODO: validation
    let user = <User>req.user;
    let book = <Book>bookWithoutAuthor;
    book.author = user.username;
    this.bookService.createBook(book);
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  putBook(@Req() req: Request, @Query() bookWithoutAuthor: Omit<Book, 'author'>): Book {
    // TODO: validation
    let user = <User>req.user;
    let book = <Book>bookWithoutAuthor;
    book.author = user.username;
    return this.bookService.updateBook(book);
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  deleteBook(@Req() req: Request, @Query() bookWithoutAuthor: Omit<Book, 'author'>): Book {
    // TODO: validation
    let user = <User>req.user;
    let book = <Book>bookWithoutAuthor;
    book.author = user.username;
    return this.bookService.deleteBook(book);
  }
}
