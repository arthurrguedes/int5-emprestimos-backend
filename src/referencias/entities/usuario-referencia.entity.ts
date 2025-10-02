import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('UsuarioReferencia')
export class UsuarioReferencia {
@PrimaryColumn({ type: 'bigint' })
id: number;

@Column({ type: 'varchar', length: 255 })
nome: string;

@Column({ type: 'varchar', length: 50 })
tipoUsuario: string;
}