import { Injectable } from '@nestjs/common';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FilesService {
  
  constructor(private readonly fileService:PrismaService){}

  async salvarDados(file: Express.Multer.File, req: Request, id:number) {
    try {
      const arquivo = await this.fileService.Image.create({data:})
    } catch (error) {
      
    }
    
    arquivo.fileName = file.filename;
    arquivo.contentLength = file.size;
    arquivo.contentType = file.mimetype;
    arquivo.url = `${req.protocol}://${req.get('host')}/files/${file.filename}`;



  }


}
