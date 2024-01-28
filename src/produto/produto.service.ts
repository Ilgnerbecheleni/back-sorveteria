/* eslint-disable prettier/prettier */
import { BadGatewayException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProdutoService {
  constructor(private prisma: PrismaService) {}

  async create(createProdutoDto: CreateProdutoDto): Promise<any> {
    try {

      const categoriaExists = await this.prisma.categoria.findFirst({
        where: { id: createProdutoDto.idCategoria },
      });

      if (!categoriaExists) {
        throw new NotFoundException(
          `Categoria com ID ${createProdutoDto.idCategoria} não encontrada`,
        );
      }

      return await this.prisma.produto.create({ data: createProdutoDto });
    } catch (error) {
      throw new BadGatewayException({message:'Erro ao criar produto', error: error});
    }
  }

  async findAll(): Promise<any> {
    try {
      return await this.prisma.produto.findMany();
    } catch (error) {
      throw new Error('Erro ao buscar produtos');
    }
  }

  async findOne(id: number): Promise<any> {
    try {
      const produto = await this.prisma.produto.findUnique({ where: { id } });
      if (!produto) {
        throw new NotFoundException(`Produto com ID ${id} não encontrado`);
      }
      return produto;
    } catch (error) {
      throw new BadGatewayException(`Erro ao buscar produto com ID ${id}`);
    }
  }

  async update(id: number, updateProdutoDto: UpdateProdutoDto): Promise<any> {
    try {
      const categoriaExists = await this.prisma.categoria.findUnique({
        where: { id: updateProdutoDto.idCategoria },
      });

      if (!categoriaExists) {
        throw new NotFoundException(
          `Categoria com ID ${updateProdutoDto.idCategoria} não encontrada`,
        );
      }

      return await this.prisma.produto.update({
        where: { id },
        data: updateProdutoDto,
      });
    } catch (error) {
      throw new BadGatewayException(`Erro ao atualizar produto com ID ${id}`);
    }
  }

  async remove(id: number): Promise<any> {
    try {
      await this.prisma.produto.delete({ where: { id } });
      return {message:"deletado com sucesso"}
    } catch (error) {
      throw new BadGatewayException(`Erro ao excluir produto com ID ${id}`);
    }
  }
}
