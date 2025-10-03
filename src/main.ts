import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppDataBase } from './database/database';
import * as dotenv from 'dotenv';

AppDataBase.initialize()
  .then(() => {
    console.log('Data Base foi inicializado!');
  })
  .catch((err) => console.error('Erro durante inicialização do data base', err));

async function bootstrap() {
dotenv.config();
await AppDataBase.initialize();

const app = await NestFactory.create(AppModule);
app.setGlobalPrefix('api');

const port = process.env.PORT || 3000;
await app.listen(port);
console.log(`Servidor rodando em http://localhost:${port}/api`);
}
bootstrap();