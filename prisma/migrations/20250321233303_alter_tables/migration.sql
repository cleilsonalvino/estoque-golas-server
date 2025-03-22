/*
  Warnings:

  - You are about to drop the `Golas` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Punhos` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Golas";

-- DropTable
DROP TABLE "Punhos";

-- CreateTable
CREATE TABLE "usuarios" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "Eadmin" BOOLEAN NOT NULL,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "golas" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "cor" TEXT NOT NULL,
    "quantidade" INTEGER NOT NULL,

    CONSTRAINT "golas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "punhos" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "cor" TEXT NOT NULL,
    "quantidade" INTEGER NOT NULL,

    CONSTRAINT "punhos_pkey" PRIMARY KEY ("id")
);
