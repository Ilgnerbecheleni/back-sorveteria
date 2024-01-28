import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriaModule } from './categoria/categoria.module';
import { PrismaModule } from './prisma/prisma.module';
import { ProdutoModule } from './produto/produto.module';
import { VendaModule } from './venda/venda.module';
import { FilesModule } from './files/files.module';
import { StaticFilesModule } from './files/static-files.module';


@Module({
  imports: [
    CategoriaModule,
    PrismaModule,
    ProdutoModule,
    VendaModule,
    FilesModule,
    StaticFilesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
