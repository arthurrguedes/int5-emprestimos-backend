import { Entity, PrimaryColumn, Column, OneToMany, JoinColumn } from 'typeorm';
import { ItemEmprestimo } from './item-emprestimo.entity';

@Entity('Emprestimo')
export class Emprestimo {
@PrimaryColumn({ type: 'bigint' })
id: number;

@Column({ type: 'date' })
dataEmprestimo: string;

@Column({ type: 'date' })
dataPrevista: string;

@Column({ type: 'date', nullable: true })
dataDevolucao?: string | null;

@Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
multa?: number | null;

@Column({ type: 'varchar', length: 50 })
status: string;

@Column({ type: 'bigint' })
idUsuario: number;

@Column({ type: 'bigint' })
idBibliotecario: number;

@OneToMany(() => ItemEmprestimo, (item) => item.emprestimo, { cascade: true })
@JoinColumn({ name: 'id' })
itens: ItemEmprestimo[];
}