/*
  Warnings:

  - Changed the type of `Eadmin` on the `usuarios` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "usuarios" ALTER COLUMN "senha" SET DEFAULT '12345',
DROP COLUMN "Eadmin",
ADD COLUMN     "Eadmin" INTEGER NOT NULL;
