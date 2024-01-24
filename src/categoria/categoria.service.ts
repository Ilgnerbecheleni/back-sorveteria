/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoriaService {

constructor(private readonly categoriaService:PrismaService) {}

async create(createCategoriaDto: CreateCategoriaDto) {
  try {
    return await this.categoriaService.categoria.create({ data: createCategoriaDto });
  } catch (error) {
    // Trate o erro conforme necessário
    throw new BadRequestException('Erro ao criar categoria');
  }
}

async findAll() {
  try {
    return await this.categoriaService.categoria.findMany();
  } catch (error) {
    // Trate o erro conforme necessário
    throw new BadRequestException('Erro ao buscar categorias');
  }
}

async findOne(id: number){
  try {
    const categoria = await this.categoriaService.categoria.findUnique({ where: { id } });
    if (!categoria) {
      throw new NotFoundException(`Categoria com ID ${id} não encontrada`);
    }
    return categoria;
  } catch (error) {
    // Trate o erro conforme necessário
    throw new BadRequestException(`Erro ao buscar categoria com ID ${id}`);
  }
}

async update(id: number, updateCategoriaDto: UpdateCategoriaDto) {
  try {
    return await this.categoriaService.categoria.update({
      where: { id },
      data: updateCategoriaDto,
    });
  } catch (error) {
    // Trate o erro conforme necessário
    throw new BadRequestException(`Erro ao atualizar categoria com ID ${id}`);
  }
}

async remove(id: number): Promise<void> {
  try {
    await this.categoriaService.categoria.delete({ where: { id } });
  } catch (error) {
    // Trate o erro conforme necessário
    throw new BadRequestException(`Erro ao excluir categoria com ID ${id}`);
  }
}
}
