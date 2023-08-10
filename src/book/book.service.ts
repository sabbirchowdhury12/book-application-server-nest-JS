import { Inject, Injectable } from '@nestjs/common';
import { Db, ObjectId } from 'mongodb';
import { Book, ResponseType } from './book.interface';

@Injectable()
export class BookService {
  constructor(@Inject('MONGODB_BOOK_USER') private db: Db) {}

  async getBooks(): Promise<Book[]> {
    const result = await this.db.collection('books').find({}).toArray();
    const books: Book[] = result.map((doc) => ({
      _id: doc._id,
      img: doc.img,
      title: doc.title,
      author: doc.author,
      genre: doc.genre,
      publicationDate: doc.publicationDate,
    }));
    return books;
  }

  async getBook(id: string) {
    const result = await this.db
      .collection('books')
      .findOne({ _id: new ObjectId(id) });
    return result;
  }
  async addBook(book: Book): Promise<ResponseType> {
    const result = await this.db.collection('books').insertOne(book);
    if (result.acknowledged === true) {
      return {
        status: true,
        message: 'book added successfully',
      };
    } else return { status: false, message: 'book added failed' };
  }

  async deleteBook(id: string): Promise<ResponseType> {
    const result = await this.db
      .collection('books')
      .deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount > 0) {
      return {
        status: true,
        message: 'book delete successfully',
      };
    } else return { status: false, message: 'book delete failed' };
  }
}
