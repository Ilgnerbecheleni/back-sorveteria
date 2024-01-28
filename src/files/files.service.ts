/* eslint-disable prettier/prettier */
import { BadGatewayException, BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Request } from 'express';
import { promises as fs } from 'fs';
@Injectable()
export class FilesService {

  constructor(private readonly fileService: PrismaService) { }

  // async salvarDados(file: Express.Multer.File, req: Request, id: number) {
  //   try {
  //     const url = `${req.protocol}://${req.get('host')}/files/${file.filename}`
  //     const arquivo = await this.fileService.imagem.create({
  //       data: {
  //         fileName: file.filename,
  //         contentLength: file.size,
  //         contentType: file.mimetype,
  //         idProduto: id,
  //         url: url

  //       }})
  //       return arquivo;
  //   } catch (error) {
  //     throw new BadGatewayException(`Falha ao fazer upload`);
  //   }
  // }

 
  async salvarDados(file: Express.Multer.File, req: Request, idProduto: number): Promise<any> {
    try {
      const existingImagem = await this.fileService.imagem.findFirst({
        where: { idProduto },
      });

      if (existingImagem) {
        // Se já existe uma imagem associada ao produto, exclua o arquivo antigo e atualize os detalhes
        await this.deleteFileFromSystem(existingImagem.fileName);

        const updatedImagem = await this.fileService.imagem.update({
          where: { id: existingImagem.id },
          data: {
            fileName: file.filename,
            contentLength: file.size,
            contentType: file.mimetype,
            url: `${req.protocol}://${req.get('host')}/files/${file.filename}`,
          },
        });

        return updatedImagem;
      } else {
        // Se não existe uma imagem associada ao produto, crie uma nova
        const newImagem = await this.fileService.imagem.create({
          data: {
            fileName: file.filename,
            contentLength: file.size,
            contentType: file.mimetype,
            idProduto: idProduto,
            url: `${req.protocol}://${req.get('host')}/files/${file.filename}`,
          },
        });

        return newImagem;
      }
    } catch (error) {
      // Lide com exceções, por exemplo, registre ou relance a exceção conforme necessário
      throw new BadGatewayException(`Erro ao salvar ou atualizar a imagem: ${error.message}`);
    }
  }

  async deleteImageById(idProduto: number): Promise<void> {
    const imagens = await this.fileService.imagem.findMany({
      where: { idProduto },
    });

    if (imagens.length === 0) {
      throw new NotFoundException(`Não foram encontradas imagens para o produto com ID ${idProduto}`);
    }

    for (const imagem of imagens) {
      const fileName = imagem.fileName;
      await this.deleteFileFromSystem(fileName);
    }

    await this.fileService.imagem.deleteMany({
      where: { idProduto },
    });
  }

  private async deleteFileFromSystem(fileName: string): Promise<void> {
    const filePath = `upload/files/${fileName}`; // Substitua pelo caminho real para o diretório de imagens

    try {
      await fs.unlink(filePath);
    } catch (error) {
      throw new BadRequestException(`Erro ao excluir arquivo do sistema: ${error.message}`);
    }
  }


  async getlAll(){
    try {
      const imagens = await this.fileService.imagem.findMany();
      return imagens;
    } catch (error) {
      throw new BadRequestException(`Falha ao buscar imagens`);
    }
  }


}
