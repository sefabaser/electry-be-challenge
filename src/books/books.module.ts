import { Module } from '@nestjs/common';
import { BooksController } from './books.controller';
import { BookModule } from 'src/book/book.module';
import { BooksService } from './books.service';

@Module({
  imports: [BookModule],
  controllers: [BooksController],
  providers: [BooksService]
})
export class BooksModule {}
