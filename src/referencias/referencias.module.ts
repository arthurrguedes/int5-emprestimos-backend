import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioReferencia } from './entities/usuario-referencia.entity';
import { Bibliotecario } from './entities/bibliotecario.entity';
import { LivroReferencia } from './entities/livro-referencia.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UsuarioReferencia, Bibliotecario, LivroReferencia])],
  exports: [TypeOrmModule],
})
export class ReferenciasModule {}
