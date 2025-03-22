/*
  Warnings:

  - You are about to drop the `golas` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `punhos` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "golas";

-- DropTable
DROP TABLE "punhos";

-- CreateTable
CREATE TABLE "Polo" (
    "codigo" TEXT NOT NULL,
    "cor" TEXT NOT NULL,

    CONSTRAINT "Polo_pkey" PRIMARY KEY ("codigo")
);

-- CreateTable
CREATE TABLE "Gola" (
    "poloCodigo" TEXT NOT NULL,
    "quantidade" INTEGER NOT NULL,

    CONSTRAINT "Gola_pkey" PRIMARY KEY ("poloCodigo")
);

-- CreateTable
CREATE TABLE "Punho" (
    "poloCodigo" TEXT NOT NULL,
    "quantidade" INTEGER NOT NULL,

    CONSTRAINT "Punho_pkey" PRIMARY KEY ("poloCodigo")
);

-- AddForeignKey
ALTER TABLE "Gola" ADD CONSTRAINT "Gola_poloCodigo_fkey" FOREIGN KEY ("poloCodigo") REFERENCES "Polo"("codigo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Punho" ADD CONSTRAINT "Punho_poloCodigo_fkey" FOREIGN KEY ("poloCodigo") REFERENCES "Polo"("codigo") ON DELETE RESTRICT ON UPDATE CASCADE;
