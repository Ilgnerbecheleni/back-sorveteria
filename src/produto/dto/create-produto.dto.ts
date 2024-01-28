import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateProdutoDto {
  @ApiProperty({
    description: "Nome do produto",
    default:"sorvete"
  })
  @IsString()
  nome: string;
  @ApiProperty({
    description:"descrição do produto",
    default:"sorvete de baunilha"
  })
  @IsString()
  descricao: string;
  @ApiProperty()
  @IsNumber()
  precoPorUnidade: number;
  @ApiProperty()
  @IsNumber()
  quantidadeEmEstoque: number;
  @ApiProperty()
  @IsNumber()
  idCategoria: number;
}
