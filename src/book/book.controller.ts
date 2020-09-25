import { Controller, UseGuards, Get, Req, Post, Query, Put, Delete } from '@nestjs/common';
import { Request } from 'express';

import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Book, BookDefinitionRequest, GetBookRequest } from 'src/book/_models';
import { BookService } from 'src/book/services/book.service';
import { User } from 'src/users/_models';

@Controller('book')
export class BookController {
  constructor(private bookService: BookService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  getBook(@Req() req: Request, @Query() query: GetBookRequest): Book {
    let user = <User>req.user;
    return this.bookService.getBook(user.username, query.title);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  postBook(@Req() req: Request, @Query() bookDefinitionRequest: BookDefinitionRequest): void {
    let book = this.mapBookDefinitionToBook(req, bookDefinitionRequest);
    this.bookService.createBook(book);
  }

  @Put()
  @UseGuards(JwtAuthGuard)
  putBook(@Req() req: Request, @Query() bookDefinitionRequest: BookDefinitionRequest): Book {
    let book = this.mapBookDefinitionToBook(req, bookDefinitionRequest);
    return this.bookService.updateBook(book);
  }

  @Delete()
  @UseGuards(JwtAuthGuard)
  deleteBook(@Req() req: Request, @Query() bookDefinitionRequest: BookDefinitionRequest): Book {
    let book = this.mapBookDefinitionToBook(req, bookDefinitionRequest);
    return this.bookService.deleteBook(book);
  }

  private mapBookDefinitionToBook(req: Request, bookDefinitionRequest: BookDefinitionRequest): Book {
    let user = <User>req.user;
    let book = <Book>{ ...bookDefinitionRequest, author: user.username };
    return book;
  }
}
