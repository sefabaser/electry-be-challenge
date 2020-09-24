import { Book } from 'src/book/interfaces';
import { BookService } from 'src/book/services/book.service';
import { BooksService } from 'src/books/refactoring/books.service';

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

const MockBooks: Book[] = [Book1, Book2];

describe('Books Service', () => {
  let mockBookService: BookService;
  let booksService: BooksService;

  beforeEach(() => {
    mockBookService = <any>{
      getAllBooks: jest.fn()
    };

    booksService = new BooksService(mockBookService);
  });

  test('should handle case: no book is stored', () => {
    (<jest.Mock>mockBookService.getAllBooks).mockReturnValueOnce([]);
    const result = booksService.getBooks({});
    expect(result).toStrictEqual([]);
  });

  test('get all books', () => {
    (<jest.Mock>mockBookService.getAllBooks).mockReturnValueOnce(MockBooks);
    const result = booksService.getBooks({});
    expect(result).toStrictEqual(MockBooks);
  });

  test('filter with author', () => {
    (<jest.Mock>mockBookService.getAllBooks).mockReturnValueOnce(MockBooks);
    const result = booksService.getBooks({ author: 'Lohgarra' });
    expect(result).toStrictEqual([Book1]);
  });

  test('filter min price', () => {
    (<jest.Mock>mockBookService.getAllBooks).mockReturnValueOnce(MockBooks);
    const result = booksService.getBooks({ minPrice: 150 });
    expect(result).toStrictEqual([Book1]);
  });

  test('filter max price', () => {
    (<jest.Mock>mockBookService.getAllBooks).mockReturnValueOnce(MockBooks);
    const result = booksService.getBooks({ maxPrice: 150 });
    expect(result).toStrictEqual([Book2]);
  });

  test('filter combination', () => {
    (<jest.Mock>mockBookService.getAllBooks).mockReturnValueOnce(MockBooks);
    const result = booksService.getBooks({ author: 'Lohgarra', minPrice: 150, maxPrice: 250 });
    expect(result).toStrictEqual([Book1]);
  });
});
