import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmprestimosModule } from './emprestimos/emprestimos.module';
import { ReferenciasModule } from './referencias/referencias.module';
import { UsuarioReferencia } from './referencias/entities/usuario-referencia.entity';
import { Bibliotecario } from './referencias/entities/bibliotecario.entity';
import { LivroReferencia } from './referencias/entities/livro-referencia.entity';
import { Emprestimo } from './emprestimos/entities/emprestimo.entity';
import { ItemEmprestimo } from './emprestimos/entities/item-emprestimo.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: false, // true só em dev
    }),
    EmprestimosModule,
    ReferenciasModule,
  ],
})
export class AppModule {}
