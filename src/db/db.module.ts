/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongoClient } from 'mongodb';

@Module({
  providers: [
    {
      provide: 'MONGODB_BOOK_USER',
      useFactory: async () => {
        try {
          const client = await MongoClient.connect(
            'mongodb://localhost:27017',
            {},
          );
          return client.db('bookDbUser');
        } catch (error) {
          throw error;
        }
      },
    },
  ],

  exports: ['MONGODB_BOOK_USER'],
})
export class MongoDbModule {}
