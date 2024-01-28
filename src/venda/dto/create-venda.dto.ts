import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsBoolean, IsOptional } from 'class-validator';

export class CreateVendaDto {
  @ApiProperty()
  @IsNumber()
  @IsOptional()
  valorTotal: number;
  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  encerrada?: boolean;
  @ApiProperty()
  @IsOptional()
  @IsOptional()
  formapagamento?: string;

  // Outras propriedades conforme necessário
}