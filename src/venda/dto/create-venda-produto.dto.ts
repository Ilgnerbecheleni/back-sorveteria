import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsInt } from 'class-validator';

export class CreateVendaProdutoDto {
  @ApiProperty()
  @IsNumber()
  quantidade: number;
  @ApiProperty()
  @IsInt()
  idProduto: number;
  @ApiProperty()
  @IsInt()
  idVenda: number;
}