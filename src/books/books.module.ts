import { Module } from '@nestjs/common';
import { BookModule } from 'src/book/book.module';
import { BooksController } from 'src/books/books.controller';
import { BooksService } from 'src/books/services/books.service';

@Module({
  imports: [BookModule],
  controllers: [BooksController],
  providers: [BooksService]
})
export class BooksModule {}
