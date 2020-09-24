import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { BookModule } from './book/book.module';
import { BooksModule } from './books/books.module';

@Module({
  imports: [AuthModule, UsersModule, BookModule, BooksModule],
  controllers: [AppController],
  providers: []
})
export class AppModule {}
