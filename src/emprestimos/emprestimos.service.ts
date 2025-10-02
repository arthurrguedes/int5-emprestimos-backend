import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Emprestimo } from './entities/emprestimo.entity';
import { ItemEmprestimo } from './entities/item-emprestimo.entity';
import { CreateEmprestimoDTO } from './dtos/create-emprestimo.dto';
import { UsuarioReferencia } from '../referencias/entities/usuario-referencia.entity';
import { LivroReferencia } from '../referencias/entities/livro-referencia.entity';
import { Bibliotecario } from '../referencias/entities/bibliotecario.entity';

@Injectable()
export class EmprestimosService {
  constructor(
    @InjectRepository(Emprestimo)
    private emprestRepo: Repository<Emprestimo>,

    @InjectRepository(ItemEmprestimo)
    private itemRepo: Repository<ItemEmprestimo>,

    @InjectRepository(UsuarioReferencia)
    private usuarioRepo: Repository<UsuarioReferencia>,

    @InjectRepository(LivroReferencia)
    private livroRepo: Repository<LivroReferencia>,

    @InjectRepository(Bibliotecario)
    private bibliotecarioRepo: Repository<Bibliotecario>,
  ) {}

   //Cria um empréstimo com seus itens em transação.
   //Valida existência de usuário, bibliotecário e livros referenciados.

  async create(createDto: CreateEmprestimoDTO): Promise<Emprestimo> {
    // Validações de FK
    const usuario = await this.usuarioRepo.findOne({ where: { id: createDto.idUsuario } });
    if (!usuario) throw new BadRequestException('Usuário não encontrado');

    const bibliotecario = await this.bibliotecarioRepo.findOne({ where: { id: createDto.idBibliotecario } });
    if (!bibliotecario) throw new BadRequestException('Bibliotecário não encontrado');

    // valida existência dos livros
    for (const it of createDto.itens) {
      const livro = await this.livroRepo.findOne({ where: { id: it.idLivro } });
      if (!livro) throw new BadRequestException(`Livro não encontrado: ${it.idLivro}`);
    }

    // monta a entidade principal
    const emprest = this.emprestRepo.create({
      id: createDto.id,
      dataEmprestimo: createDto.dataEmprestimo,
      dataPrevista: createDto.dataPrevista,
      status: 'Vigente',
      idUsuario: createDto.idUsuario,
      idBibliotecario: createDto.idBibliotecario,
    });

    // cria itens (gera ids simples — ajustar conforme sua estratégia de PK)
    emprest.itens = createDto.itens.map((it, idx) =>
      this.itemRepo.create({
        id: Date.now() + idx,
        quantidade: it.quantidade,
        idEmprestimo: createDto.id,
        idLivro: it.idLivro,
      }),
    );

    return this.emprestRepo.save(emprest);
  }

  /** Listar todos */
  async findAll(): Promise<Emprestimo[]> {
    return this.emprestRepo.find({ relations: ['itens'] });
  }

  /** Buscar por id */
  async findById(id: number): Promise<Emprestimo> {
    const e = await this.emprestRepo.findOne({ where: { id }, relations: ['itens'] });
    if (!e) throw new NotFoundException('Empréstimo não encontrado');
    return e;
  }

  /** Atualizar (somente datas e status) */
  async update(id: number, data: Partial<Emprestimo>): Promise<Emprestimo> {
    const emprest = await this.findById(id);
    Object.assign(emprest, data);
    return this.emprestRepo.save(emprest);
  }

  /** Marca devolução e calcula multa básica (R$1 por dia atrasado). */
  async devolucao(id: number, dataDevolucao: string): Promise<Emprestimo> {
    const emprest = await this.findById(id);
    if (emprest.status === 'Devolvido') throw new BadRequestException('Já devolvido');

    emprest.dataDevolucao = dataDevolucao;
    emprest.status = 'Devolvido';

    const prevista = new Date(emprest.dataPrevista);
    const devol = new Date(dataDevolucao);
    if (devol > prevista) {
      const dias = Math.ceil((devol.getTime() - prevista.getTime()) / (1000 * 3600 * 24));
      emprest.multa = dias * 1;
    } else {
      emprest.multa = 0;
    }

    return this.emprestRepo.save(emprest);
  }

  /** Listar por usuário */
  async findByUsuario(idUsuario: number): Promise<Emprestimo[]> {
    return this.emprestRepo.find({ where: { idUsuario }, relations: ['itens'] });
  }

  /** Remover empréstimo */
  async remove(id: number): Promise<void> {
    const emprest = await this.findById(id);
    await this.emprestRepo.remove(emprest);
  }
}
