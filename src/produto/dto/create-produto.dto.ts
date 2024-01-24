import { IsNumber, IsString } from 'class-validator';

export class CreateProdutoDto {
  @IsString()
  nome: string;
  @IsString()
  descricao: string;
  @IsNumber()
  precoPorUnidade: number;
  @IsNumber()
  quantidadeEmEstoque: number;
  @IsNumber()
  idCategoria: number;
}
