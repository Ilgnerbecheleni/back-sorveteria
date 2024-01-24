/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { VendaService } from './venda.service';
import { CreateVendaDto } from './dto/create-venda.dto';
import { CreateVendaProdutoDto } from './dto/create-venda-produto.dto';

@Controller('venda')
export class VendaController {
  constructor(private readonly vendaService: VendaService) {}

  @Post()
  createVenda(@Body() createVendaDto: CreateVendaDto) {
    return this.vendaService.createVenda(createVendaDto);
  }

  @Post('produtos')
  createVendaProduto(@Body() createVendaProdutoDto: CreateVendaProdutoDto) {
    return this.vendaService.createVendaProduto(createVendaProdutoDto);
  }

  @Post('encerrar/:id')
  encerrarVenda(@Param('id',new ParseIntPipe()) id: number) {
    return this.vendaService.encerrarVenda(id);
  }

  @Get(':id/itens')
  obterItensVenda(@Param('id',new ParseIntPipe()) id: number) {
    return this.vendaService.obterItensVenda(+id)
     
  }
  
  @Get(':id/valorTotal')
  calcularValorTotalVenda(@Param('id',new ParseIntPipe()) id: number) {
    return this.vendaService.calcularValorTotalVenda(id);
    
  }



}
