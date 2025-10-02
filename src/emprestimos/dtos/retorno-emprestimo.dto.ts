export class RetornoEmprestimoDTO {
id: number;
dataEmprestimo: string;
dataPrevista: string;
dataDevolucao?: string;
multa?: number;
status: string;
idUsuario: number;
idBibliotecario: number;
itens: { id: number; idLivro: number; quantidade: number }[];
}