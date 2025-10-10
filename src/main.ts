import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppDataBase } from './database/database';
import * as dotenv from 'dotenv';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  dotenv.config();

  try {
    await AppDataBase.initialize();
    console.log('Banco de dados inicializado com sucesso!');
  } catch (err) {
    console.error('Erro durante a inicialização do banco de dados', err);
  }

  const app = await NestFactory.create(AppModule);

  // prefixo global para suas rotas (ex: /api/emprestimos)
  app.setGlobalPrefix('api');
  app.enableCors();

  // configuração do Swagger
  const config = new DocumentBuilder()
    .setTitle('API de Empréstimos')
    .setDescription('Documentação da API do sistema de empréstimos')
    .setVersion('1.0')
    .addTag('emprestimos')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('', app, document); // acessível em /emprestimos

  // Porta configurável via .env
  const port = process.env.PORT || 3000;
  await app.listen(port);

  console.log(`Servidor rodando em http://localhost:${port}/api`);
  console.log(`Swagger disponível em http://localhost:${port}/`);
}

bootstrap();
