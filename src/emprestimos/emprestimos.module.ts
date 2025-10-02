import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmprestimosService } from './emprestimos.service';
import { EmprestimosController } from './emprestimos.controller';
import { Emprestimo } from './entities/emprestimo.entity';
import { ItemEmprestimo } from './entities/item-emprestimo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Emprestimo, ItemEmprestimo])],
  controllers: [EmprestimosController],
  providers: [EmprestimosService],
})
export class EmprestimosModule {}
