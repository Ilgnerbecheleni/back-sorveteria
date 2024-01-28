/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Param, UseInterceptors, UploadedFile, Req, ParseIntPipe, Res, Delete } from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import multerConfig from './multer-config';
import { Request ,Response} from 'express';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}
  @Post(':id')
  @UseInterceptors(FileInterceptor('arquivo', multerConfig))
  uploadArquivo(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: Request,@Param('id',new ParseIntPipe())id:number) {
    return this.filesService.salvarDados(file, req , id);
  }

  @Get(':fileName')
  serveImage(@Param('fileName') fileName: string, @Res() res: Response): void {
    res.sendFile(fileName, { root: 'upload/files' }); // Substitua pelo caminho real para o diretório de imagens
  }

  @Get()
  getAll(){
    return this.filesService.getlAll();
  }


}
