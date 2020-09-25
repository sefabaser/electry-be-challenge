import { Book } from 'src/book/_interfaces';
import { BookService } from 'src/book/services/book.service';

const Book1: Book = {
  title: 'order 66',
  description: 'history of clone wars',
  coverImage: 'http://something.png',
  price: 200,
  author: 'Lohgarra'
};

const Book2: Book = {
  title: 'path of darkness',
  description: 'Fear leads to anger. Anger leads to hate. Hate leads to suffering.',
  coverImage: 'http://something.png',
  price: 100,
  author: 'Jiprirr'
};

const Book3: Book = {
  title: 'cook book of ewoks',
  description: 'Delicious ewok recepies.',
  coverImage: 'http://something.png',
  price: 50,
  author: 'Nagraoao'
};

describe('Book Service', () => {
  let bookService: BookService;

  beforeEach(() => {
    bookService = new BookService();
    // TODO: update to "fake db connection" after having the db
    (<any>bookService).books = [Book1, Book2];
  });

  test('get all books', () => {
    let result = bookService.getAllBooks();
    expect(result).toStrictEqual([Book1, Book2]);
  });

  test('get book', () => {
    let result = bookService.getBook('Lohgarra', 'order 66');
    expect(result).toStrictEqual(Book1);
  });

  test('get book should throw error if no book is found', () => {
    expect(() => bookService.getBook('Lohgarra', 'invalid book')).toThrow('No book found');
  });

  test('create book', () => {
    let result = bookService.createBook(Book3);
    expect(result).toStrictEqual(Book3);

    let allBooks = bookService.getAllBooks();
    expect(allBooks).toStrictEqual([Book1, Book2, Book3]);
  });

  test('create book should throw error if book is already exists', () => {
    expect(() => bookService.createBook(Book2)).toThrow('Book already exists');
  });

  test('update book', () => {
    let newBook2 = {
      title: 'path of darkness',
      description: 'Something something something dark side, something something something complete',
      coverImage: 'http://something.png',
      price: 100,
      author: 'Jiprirr'
    };

    let result = bookService.updateBook(newBook2);
    expect(result).toStrictEqual(newBook2);

    let allBooks = bookService.getAllBooks();
    expect(allBooks).toStrictEqual([Book1, newBook2]);
  });

  test('update book should throw error if book is not exists', () => {
    expect(() => bookService.updateBook(Book3)).toThrow('No book found');
  });

  test('delete book', () => {
    let result = bookService.deleteBook(Book2);
    expect(result).toStrictEqual(Book2);

    let allBooks = bookService.getAllBooks();
    expect(allBooks).toStrictEqual([Book1]);
  });

  test('delete book should throw error if book is not exists', () => {
    expect(() => bookService.deleteBook(Book3)).toThrow('No book found');
  });
});
