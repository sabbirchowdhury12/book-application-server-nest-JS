/* eslint-disable prettier/prettier */

export interface Book {
  title: string;
  author: string;
  genre: string;
  publicationDate: string;
  reviews?: string[];
}

export interface ResponseType {
  status: boolean;
  message: string;
}
