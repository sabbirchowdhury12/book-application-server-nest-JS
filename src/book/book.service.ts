import { Inject, Injectable } from '@nestjs/common';
import { Db, ObjectId } from 'mongodb';
import { Book, ResponseType } from './book.interface';

@Injectable()
export class BookService {
  constructor(@Inject('MONGODB_BOOK_USER') private db: Db) {}

  async getBooks(search, genre, year): Promise<Book[]> {
    console.log(search, genre, year);
    let query: any = {};
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { author: { $regex: search, $options: 'i' } },
        { genre: { $regex: search, $options: 'i' } },
      ];
    }

    if (genre) {
      query.genre = genre;
    }

    if (year) {
      query.publicationDate = year;
    }
    const result = await this.db.collection('books').find(query).toArray();
    const books: Book[] = result.map((doc) => ({
      _id: doc._id,
      img: doc.img,
      title: doc.title,
      author: doc.author,
      genre: doc.genre,
      publicationDate: doc.publicationDate,
      reviews: doc.reviews,
    }));
    return books;
  }

  async getBook(id: string) {
    const result = await this.db
      .collection('books')
      .findOne({ _id: new ObjectId(id) });
    return result;
  }
  //Promise<ResponseType>
  async addBook(book: Book) {
    book.reviews = [];

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

  async editBook(id: string, book: Book) {
    const filter = { _id: new ObjectId(id) };

    const updateOperation = {
      $set: {
        title: book.title,
        author: book.author,
        genre: book.genre,
      },
    };

    const result = await this.db
      .collection('books')
      .updateMany(filter, updateOperation);

    return result;
  }

  async addReview(id: string, review: { review: string }) {
    const filter = { _id: new ObjectId(id) };

    const updateOperation = {
      $push: {
        reviews: review.review,
      },
    };

    const result = await this.db
      .collection('books')
      .updateOne(filter, updateOperation);

    return result;
  }
}
