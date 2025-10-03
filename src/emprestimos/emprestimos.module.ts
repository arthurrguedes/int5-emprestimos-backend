import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmprestimosService } from './emprestimos.service';
import { EmprestimosController } from './emprestimos.controller';
import { Emprestimo } from './entities/emprestimo.entity';
import { ItemEmprestimo } from './entities/item-emprestimo.entity';
import { LivroReferencia } from 'src/referencias/entities/livro-referencia.entity';
import { Bibliotecario } from 'src/referencias/entities/bibliotecario.entity';
import { ReferenciasModule } from 'src/referencias/referencias.module';

@Module({
  imports: [TypeOrmModule.forFeature([Emprestimo, ItemEmprestimo, LivroReferencia, Bibliotecario]),
  ReferenciasModule,],

  controllers: [EmprestimosController],
  providers: [EmprestimosService],
})
export class EmprestimosModule {}
