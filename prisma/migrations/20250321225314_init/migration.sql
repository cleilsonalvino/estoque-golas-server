-- CreateTable
CREATE TABLE "Golas" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "cor" TEXT NOT NULL,
    "quantidade" INTEGER NOT NULL,

    CONSTRAINT "Golas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Punhos" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "cor" TEXT NOT NULL,
    "quantidade" INTEGER NOT NULL,

    CONSTRAINT "Punhos_pkey" PRIMARY KEY ("id")
);
