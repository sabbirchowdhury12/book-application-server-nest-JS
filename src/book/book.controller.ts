import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { BookService } from './book.service';
import { Book } from './book.interface';

@Controller('/')
export class BookController {
  constructor(private readonly bookService: BookService) {}
  @Get('books')
  async getBooks(
    @Query('search') search: string,
    @Query('genre') genre: string,
    @Query('year') year: number,
  ): Promise<Book[]> {
    return await this.bookService.getBooks(search, genre, year);
  }
  @Get('book/:id')
  async getBook(@Param('id') id: string) {
    return await this.bookService.getBook(id);
  }
  @Post('book')
  async addBook(@Body() book: Book) {
    return await this.bookService.addBook(book);
  }
  @Patch('book/:id')
  async editBook(@Body() book: Book, @Param('id') id: string) {
    return await this.bookService.editBook(id, book);
  }

  @Delete('book/:id')
  async deleteBook(@Param('id') id: string) {
    return await this.bookService.deleteBook(id);
  }
  @Patch('add-review/:id')
  async addReview(@Param('id') id: string, @Body() review: { review: string }) {
    return await this.bookService.addReview(id, review);
  }
}
