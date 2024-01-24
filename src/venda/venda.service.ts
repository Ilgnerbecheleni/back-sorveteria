/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateVendaDto } from './dto/create-venda.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateVendaProdutoDto } from './dto/create-venda-produto.dto';

@Injectable()
export class VendaService {

  constructor(private vendaService: PrismaService) {}

  async createVenda(createVendaDto: CreateVendaDto): Promise<any> {
    try {
      return await this.vendaService.venda.create({ data: createVendaDto });
    } catch (error) {
      throw new Error('Erro ao criar venda');
    }
  }

  async findVendaId(id:number){
    try {
      const venda = await this.vendaService.venda.findUnique({ where: { id } });
      if(!venda){
        throw new NotFoundException('Não foi encontrada uma venda com o id informado');
      }

      return venda

    } catch (error) {
      throw new Error('Erro ao buscar venda');
    }
  }

  async encerrarVenda(id: number): Promise<any> {
    try {
      const venda = await this.findVendaId(id);

      if(!venda){
        throw new BadRequestException("A venda não existe");
      }    
      
      await this.vendaService.venda.update({
        where: { id },
        data: { ...venda, encerrada: true },
      });

      return venda;
    } catch (error) {
      throw new BadRequestException(`Erro ao encerrar venda com ID ${id}`);
    }
  }

  async createVendaProduto(createVendaProdutoDto: CreateVendaProdutoDto): Promise<any> {
    try {
      const venda = await this.vendaService.venda.findUnique({
        where: { id: createVendaProdutoDto.idVenda },
        include: { produtos: true },
      });
  
      if (!venda) {
        throw new NotFoundException(`Venda com ID ${createVendaProdutoDto.idVenda} não encontrada`);
      }
  
      if (venda.encerrada) {
        throw new BadRequestException("Não é possível adicionar produtos a uma venda encerrada");
      }
  
      const produtoExistente = venda.produtos.find(
        (produto) => produto.idProduto === createVendaProdutoDto.idProduto
      );
  
      if (produtoExistente) {
        // Se o produto já existe, atualize apenas a quantidade
        await this.vendaService.vendaProduto.update({
          where: { id: produtoExistente.id },
          data: { quantidade: produtoExistente.quantidade + createVendaProdutoDto.quantidade },
        });
      } else {
        // Se o produto não existe, crie um novo
        await this.vendaService.vendaProduto.create({ data: createVendaProdutoDto });
      }
  
      return { message: 'Produto adicionado à venda com sucesso' };
    } catch (error) {
      throw new BadRequestException('Erro ao adicionar produto à venda');
    }
  }

  async obterItensVenda(id: number): Promise<any[]> {
    try {
      const itensVenda = await this.vendaService.vendaProduto.findMany({
        where: { idVenda: id },
        include: { produto: true }, // incluir detalhes do produto
      });

      if (!itensVenda || itensVenda.length === 0) {
        throw new NotFoundException(`Itens da venda com ID ${id} não encontrados`);
      }

      return itensVenda;
    } catch (error) {
      throw new BadRequestException(`Erro ao obter itens da venda com ID ${id}`);
    }
  }

  async calcularValorTotalVenda(id: number): Promise<number> {
    try {
      const itensVenda = await this.obterItensVenda(id);

      const valorTotal = itensVenda.reduce((total, item) => {
        return total + item.produto.precoPorUnidade * item.quantidade;
      }, 0);

      return valorTotal;
    } catch (error) {
      throw new Error(`Erro ao calcular valor total da venda com ID ${id}`);
    }
  }




}
