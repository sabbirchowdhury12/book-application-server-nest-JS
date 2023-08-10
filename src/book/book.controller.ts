import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { BookService } from './book.service';
import { Book } from './book.interface';

@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}
  @Get()
  async getBooks(): Promise<Book[]> {
    return await this.bookService.getBooks();
  }
  @Get(':id')
  async getBook(@Param('id') id: string) {
    return await this.bookService.getBook(id);
  }
  @Post()
  async addBook(@Body() book: Book) {
    console.log(book);
    return await this.bookService.addBook(book);
  }

  @Delete(':id')
  async deleteBook(@Param('id') id: string) {
    return await this.bookService.deleteBook(id);
  }
}
