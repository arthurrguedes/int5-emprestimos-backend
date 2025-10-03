import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { UsuarioReferencia } from '../referencias/entities/usuario-referencia.entity';
import { Bibliotecario } from '../referencias/entities/bibliotecario.entity';
import { LivroReferencia } from '../referencias/entities/livro-referencia.entity';
import { Emprestimo } from '../emprestimos/entities/emprestimo.entity';
import { ItemEmprestimo } from '../emprestimos/entities/item-emprestimo.entity';
import * as dotenv from 'dotenv';

dotenv.config();

export const AppDataBase = new DataSource({
type: 'mysql',
url: process.env.DATABASE_URL,
synchronize: false, 
logging: false,
entities: [UsuarioReferencia, Bibliotecario, LivroReferencia, Emprestimo, ItemEmprestimo],
});