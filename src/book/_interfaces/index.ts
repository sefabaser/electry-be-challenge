import { Type } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

export class GetBookRequest {
  @IsString()
  title: string;
}

export class BookDefinitionRequest {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  coverImage: string;

  @Type(() => Number)
  @IsNumber()
  price: number;
}

export interface Book {
  title: string;
  description: string;
  author: string;
  coverImage: string;
  price: number;
}
