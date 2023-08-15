import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
  });
  const corsOptions = {
    origin: 'http://localhost:3000', // This allows all origins. You can set specific origins as well.
    methods: 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
    credentials: true,
    allowedHeaders:
      'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version Access-Control-Allow-Origin',
  };

  app.enableCors(corsOptions);

  await app.listen(5000);
}
bootstrap();
