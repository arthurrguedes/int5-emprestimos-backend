import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppDataBase } from './database/database';
import * as dotenv from 'dotenv';

async function bootstrap() {
dotenv.config();
await AppDataBase.initialize();

const app = await NestFactory.create(AppModule);
app.setGlobalPrefix('api');

const port = process.env.PORT || 3000;
await app.listen(port);
console.log(`Server running on http://localhost:${port}/api`);
}
bootstrap();