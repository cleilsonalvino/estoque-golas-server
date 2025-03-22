-- CreateTable
CREATE TABLE "Gola" (
    "poloCodigo" TEXT NOT NULL,
    "quantidade" INTEGER NOT NULL,

    CONSTRAINT "Gola_pkey" PRIMARY KEY ("poloCodigo")
);

-- CreateTable
CREATE TABLE "Polo" (
    "codigo" TEXT NOT NULL,
    "cor" TEXT NOT NULL,

    CONSTRAINT "Polo_pkey" PRIMARY KEY ("codigo")
);

-- CreateTable
CREATE TABLE "Punho" (
    "poloCodigo" TEXT NOT NULL,
    "quantidade" INTEGER NOT NULL,

    CONSTRAINT "Punho_pkey" PRIMARY KEY ("poloCodigo")
);

-- CreateTable
CREATE TABLE "usuarios" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "senha" TEXT NOT NULL DEFAULT '12345',
    "Eadmin" INTEGER NOT NULL,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_nome_key" ON "usuarios"("nome");

-- AddForeignKey
ALTER TABLE "Gola" ADD CONSTRAINT "Gola_poloCodigo_fkey" FOREIGN KEY ("poloCodigo") REFERENCES "Polo"("codigo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Punho" ADD CONSTRAINT "Punho_poloCodigo_fkey" FOREIGN KEY ("poloCodigo") REFERENCES "Polo"("codigo") ON DELETE RESTRICT ON UPDATE CASCADE;
