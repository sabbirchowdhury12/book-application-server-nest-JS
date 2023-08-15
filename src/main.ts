import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const corsOptions = {
    origin: true, // This allows all origins. You can set specific origins as well.
    methods: 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
    credentials: true,
    allowedHeaders:
      'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
  };

  app.enableCors(corsOptions);

  await app.listen(5000);
}
bootstrap();
