import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('Bibliotecario')
export class Bibliotecario {
@PrimaryColumn({ type: 'bigint' })
id: number;

@Column({ type: 'varchar', length: 50 })
matricula: string;
}