import { Module } from '@nestjs/common';
import { MongoDbModule } from './db/db.module';
import { BookController } from './book/book.controller';
import { BookService } from './book/book.service';

@Module({
  imports: [MongoDbModule],
  controllers: [BookController],
  providers: [BookService],
})
export class AppModule {}
