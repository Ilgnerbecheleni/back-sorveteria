import { IsNumber, IsBoolean, IsOptional } from 'class-validator';

export class CreateVendaDto {
  @IsNumber()
  @IsOptional()
  valorTotal: number;

  @IsBoolean()
  @IsOptional()
  encerrada?: boolean;

  @IsOptional()
  @IsOptional()
  formapagamento?: string;

  // Outras propriedades conforme necessário
}