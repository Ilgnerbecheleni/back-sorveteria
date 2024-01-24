import { IsNumber, IsInt } from 'class-validator';

export class CreateVendaProdutoDto {
  @IsNumber()
  quantidade: number;

  @IsInt()
  idProduto: number;

  @IsInt()
  idVenda: number;
}