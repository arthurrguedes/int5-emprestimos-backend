import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('LivroReferencia')
export class LivroReferencia {
@PrimaryColumn({ type: 'bigint' })
id: number;

@Column({ type: 'varchar', length: 255 })
titulo: string;

@Column({ type: 'varchar', length: 20, unique: true })
isbn: string;
}