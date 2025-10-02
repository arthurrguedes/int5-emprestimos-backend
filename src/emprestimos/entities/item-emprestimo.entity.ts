import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Emprestimo } from './emprestimo.entity';

@Entity('ItemEmprestimo')
export class ItemEmprestimo {
@PrimaryColumn({ type: 'bigint' })
id: number;

@Column({ type: 'int' })
quantidade: number;

@Column({ type: 'bigint' })
idEmprestimo: number;

@Column({ type: 'bigint' })
idLivro: number;

@ManyToOne(() => Emprestimo, (e) => e.itens)
@JoinColumn({ name: 'idEmprestimo' })
emprestimo: Emprestimo;
}