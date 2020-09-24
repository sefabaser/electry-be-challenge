import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { BookModule } from 'src/book/book.module';
import { BooksModule } from 'src/books/books.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [AuthModule, UsersModule, BookModule, BooksModule],
  controllers: [],
  providers: []
})
export class AppModule {}
