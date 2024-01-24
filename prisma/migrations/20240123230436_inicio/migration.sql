/*
  Warnings:

  - You are about to alter the column `quantidadeEmEstoque` on the `produto` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.

*/
-- AlterTable
ALTER TABLE `produto` MODIFY `quantidadeEmEstoque` DOUBLE NULL;
