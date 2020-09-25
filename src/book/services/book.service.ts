import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Book } from 'src/book/_models';

@Injectable()
export class BookService {
  private books: Book[] = [
    {
      title: 'order 66',
      description: 'history of clone wars',
      coverImage: 'http://something.png',
      price: 200,
      author: 'Lohgarra'
    },
    {
      title: 'path of darkness',
      description: 'Fear leads to anger. Anger leads to hate. Hate leads to suffering.',
      coverImage: 'http://something.png',
      price: 100,
      author: 'Jiprirr'
    }
  ]; // TODO: move it to db

  getBook(author: string, title: string): Book {
    let book = this.books.find(item => item.author === author && item.title === title);
    if (!book) {
      throw new HttpException('No book found', HttpStatus.BAD_REQUEST);
    }

    return book;
  }

  createBook(book: Book): Book {
    let index = this.books.findIndex(item => item.author === book.author && item.title === book.title);
    if (index !== -1) {
      throw new HttpException('Book already exists', HttpStatus.BAD_REQUEST);
    }

    this.books.push(book);
    return book;
  }

  updateBook(book: Book): Book {
    let index = this.books.findIndex(item => item.author === book.author && item.title === book.title);
    if (index === -1) {
      throw new HttpException('No book found', HttpStatus.BAD_REQUEST);
    }

    this.books.splice(index, 1, book)[0];
    return book;
  }

  deleteBook(book: Book): Book {
    let index = this.books.findIndex(item => item.author === book.author && item.title === book.title);
    if (index === -1) {
      throw new HttpException('No book found', HttpStatus.BAD_REQUEST);
    }

    return this.books.splice(index, 1)[0];
  }

  getAllBooks(): Book[] {
    return this.books;
  }
}
