/*
  Warnings:

  - You are about to drop the column `precoPorKilo` on the `produto` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `produto` DROP COLUMN `precoPorKilo`;

-- AlterTable
ALTER TABLE `venda` ADD COLUMN `encerrada` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `formapagamento` VARCHAR(191) NULL;
