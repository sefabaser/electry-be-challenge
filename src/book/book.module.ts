import { Module } from '@nestjs/common';
import { BookController } from 'src/book/book.controller';
import { BookService } from 'src/book/services/book.service';

@Module({
  controllers: [BookController],
  providers: [BookService],
  exports: [BookService]
})
export class BookModule {}
