import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriaModule } from './categoria/categoria.module';
import { PrismaModule } from './prisma/prisma.module';
import { ProdutoModule } from './produto/produto.module';
import { VendaModule } from './venda/venda.module';

@Module({
  imports: [CategoriaModule, PrismaModule, ProdutoModule, VendaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
