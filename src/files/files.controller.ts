import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Req, ParseIntPipe } from '@nestjs/common';
import { FilesService } from './files.service';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import multerConfig from './multer-config';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}
  @Post()
  @UseInterceptors(FileInterceptor('arquivo', multerConfig))
  uploadArquivo(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: Request,@Param('id',new ParseIntPipe())id:number
  ) {
    return this.filesService.salvarDados(file, req , id);
  }
}
