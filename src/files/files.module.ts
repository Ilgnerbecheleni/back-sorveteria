/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { StaticFilesModule } from './static-files.module';


@Module({
  imports:[PrismaModule,StaticFilesModule],
  controllers: [FilesController],
  providers: [FilesService],
})
export class FilesModule {}
