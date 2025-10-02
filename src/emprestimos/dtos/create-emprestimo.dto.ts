import { IsNotEmpty, IsDateString, IsArray, ValidateNested, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

class ItemDTO {
@IsNumber()
idLivro: number;

@IsNumber()
quantidade: number;
}

export class CreateEmprestimoDTO {
@IsNumber()
id: number;

@IsDateString()
dataEmprestimo: string;

@IsDateString()
dataPrevista: string;

@IsNumber()
idUsuario: number;

@IsNumber()
idBibliotecario: number;

@IsNotEmpty()
@IsArray()
@ValidateNested({ each: true })
@Type(() => ItemDTO)
itens: ItemDTO[];
}