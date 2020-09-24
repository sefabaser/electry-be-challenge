export interface GetBookRequest {
  title: string;
}

export interface Book {
  title: string;
  description: string;
  author: string; // TODO: use author
  coverImage: string;
  price: number;
}

export type BookQuery = Omit<Book, 'author'>;
