/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/mapped-types';
import { CreateProdutoDto } from './create-produto.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProdutoDto extends PartialType(CreateProdutoDto) {
    @ApiProperty()
    nome: string;
    @ApiProperty()
    descricao: string;
    @ApiProperty()
    precoPorUnidade: number;
    @ApiProperty()
    quantidadeEmEstoque: number;
    @ApiProperty()
    idCategoria: number;
}
