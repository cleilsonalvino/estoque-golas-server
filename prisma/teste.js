import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Dados organizados com cor como string vazia quando não há dados
const polosData = [
    { codigo: "POLO01", cor: "AMARELO", gola: { quantidade: 0 }, punho: { quantidade: 0 } },
    { codigo: "POLO02", cor: "AMARELO", gola: { quantidade: 0 }, punho: { quantidade: 0 } },
    { codigo: "POLO03", cor: "AMARELO OURO", gola: { quantidade: 0 }, punho: { quantidade: 0 } },
    { codigo: "POLO04", cor: "PRETO C/ AMARELO", gola: { quantidade: 0 }, punho: { quantidade: 0 } },
    { codigo: "POLO05", cor: "PRETO C/ AMARELO", gola: { quantidade: 0 }, punho: { quantidade: 0 } },
    { codigo: "POLO06", cor: "PRETO C/ VERMELHO", gola: { quantidade: 0 }, punho: { quantidade: 0 } },
    { codigo: "POLO07", cor: "PRETO C/ BRANCO", gola: { quantidade: 0 }, punho: { quantidade: 0 } },
    { codigo: "POLO08", cor: "AZUL C/ BRANCO", gola: { quantidade: 0 }, punho: { quantidade: 0 } },
    { codigo: "POLO09", cor: "VERDE SECO", gola: { quantidade: 0 }, punho: { quantidade: 0 } },
    { codigo: "POLO10", cor: "AMARELO", gola: { quantidade: 0 }, punho: { quantidade: 0 } },
    { codigo: "POLO11", cor: "VERDE NEON", gola: { quantidade: 0 }, punho: { quantidade: 0 } },
    { codigo: "POLO12", cor: "CINZA 3", gola: { quantidade: 0 }, punho: { quantidade: 0 } },
    { codigo: "POLO13", cor: "CINZA", gola: { quantidade: 0 }, punho: { quantidade: 0 } },
    { codigo: "POLO14", cor: "CINZA C/ BRANCO", gola: { quantidade: 0 }, punho: { quantidade: 0 } },
    { codigo: "POLO15", cor: "CINZA C/ AMARELO", gola: { quantidade: 0 }, punho: { quantidade: 0 } },
    { codigo: "POLO16", cor: "PRETO C/ VERDE", gola: { quantidade: 0 }, punho: { quantidade: 0 } },
    { codigo: "POLO17", cor: "AZUL C/ BRANCO", gola: { quantidade: 0 }, punho: { quantidade: 0 } },
    { codigo: "POLO18", cor: "AZUL CELESTE", gola: { quantidade: 0 }, punho: { quantidade: 0 } },
    { codigo: "POLO19", cor: "AZUL CLARO", gola: { quantidade: 0 }, punho: { quantidade: 0 } },
    { codigo: "POLO20", cor: "AZUL MARINHO C/ VINHO", gola: { quantidade: 0 }, punho: { quantidade: 0 } },
    { codigo: "POLO21", cor: "MARROM", gola: { quantidade: 0 }, punho: { quantidade: 0 } },
    { codigo: "POLO22", cor: "BEGE, BRANCO, VINHO", gola: { quantidade: 0 }, punho: { quantidade: 0 } },
    { codigo: "POLO23", cor: "AZUL, BRANCO, PRETO", gola: { quantidade: 0 }, punho: { quantidade: 0 } },
    { codigo: "POLO24", cor: "ROSA BEBE", gola: { quantidade: 0 }, punho: { quantidade: 0 } },
    { codigo: "POLO25", cor: "LARANJA NEON", gola: { quantidade: 0 }, punho: { quantidade: 0 } },
    { codigo: "POLO26", cor: "VERDE C/ BRANCO", gola: { quantidade: 0 }, punho: { quantidade: 0 } },
    { codigo: "POLO27", cor: "LARANJA", gola: { quantidade: 0 }, punho: { quantidade: 0 } },
    { codigo: "POLO28", cor: "MARROM ESCURO", gola: { quantidade: 0 }, punho: { quantidade: 0 } },
    { codigo: "POLO29", cor: "VERMELHO C/ BRANCO", gola: { quantidade: 0 }, punho: { quantidade: 0 } },
    { codigo: "POLO30", cor: "PRETO C/ CINZA", gola: { quantidade: 0 }, punho: { quantidade: 0 } },
    { codigo: "POLO31", cor: "", gola: { quantidade: 0 }, punho: { quantidade: 0 } },
    { codigo: "POLO32", cor: "", gola: { quantidade: 0 }, punho: { quantidade: 0 } },
    { codigo: "POLO33", cor: "VERMELHO 01", gola: { quantidade: 0 }, punho: { quantidade: 0 } },
    { codigo: "POLO34", cor: "VERMELHO 02", gola: { quantidade: 0 }, punho: { quantidade: 0 } },
    { codigo: "POLO35", cor: "AMARELO 02", gola: { quantidade: 0 }, punho: { quantidade: 0 } },
    { codigo: "POLO36", cor: "AMARELO 01", gola: { quantidade: 0 }, punho: { quantidade: 0 } },
    { codigo: "POLO37", cor: "AMARELO 03", gola: { quantidade: 0 }, punho: { quantidade: 0 } },
    { codigo: "POLO38", cor: "AZUL 01", gola: { quantidade: 0 }, punho: { quantidade: 0 } },
    { codigo: "POLO39", cor: "AZUL 02", gola: { quantidade: 0 }, punho: { quantidade: 0 } },
    { codigo: "POLO40", cor: "AZUL 03", gola: { quantidade: 0 }, punho: { quantidade: 0 } },
    { codigo: "POLO41", cor: "AZUL", gola: { quantidade: 0 }, punho: { quantidade: 0 } },
    { codigo: "POLO42", cor: "PRETO", gola: { quantidade: 0 }, punho: { quantidade: 0 } },
    { codigo: "POLO43", cor: "BRANCO GROSSO", gola: { quantidade: 0 }, punho: { quantidade: 0 } },
    { codigo: "POLO44", cor: "BRANCO 03", gola: { quantidade: 0 }, punho: { quantidade: 0 } },
    { codigo: "POLO45", cor: "BRANCO LISO", gola: { quantidade: 0 }, punho: { quantidade: 0 } },
    { codigo: "POLO46", cor: "CINZA FORTE", gola: { quantidade: 0 }, punho: { quantidade: 0 } },
    { codigo: "POLO47", cor: "CINZA CLARO", gola: { quantidade: 0 }, punho: { quantidade: 0 } },
    { codigo: "POLO48", cor: "LARANJA 01", gola: { quantidade: 0 }, punho: { quantidade: 0 } },
    { codigo: "POLO49", cor: "AZUL C/ BRANCO", gola: { quantidade: 0 }, punho: { quantidade: 0 } },
    { codigo: "POLO50", cor: "VERDE E AMARELO", gola: { quantidade: 0 }, punho: { quantidade: 0 } },
    { codigo: "POLO51", cor: "PRETO C/ VERMELHO", gola: { quantidade: 0 }, punho: { quantidade: 0 } },
    { codigo: "POLO52", cor: "ROXO", gola: { quantidade: 0 }, punho: { quantidade: 0 } },
    { codigo: "POLO53", cor: "PRETO C/ VERMELHO", gola: { quantidade: 0 }, punho: { quantidade: 0 } },
    { codigo: "POLO54", cor: "ROSA", gola: { quantidade: 0 }, punho: { quantidade: 0 } },
    { codigo: "POLO55", cor: "VERMELHO C/ PRETO", gola: { quantidade: 0 }, punho: { quantidade: 0 } },
    { codigo: "POLO56", cor: "CINZA, BRANCO E AZUL", gola: { quantidade: 0 }, punho: { quantidade: 0 } },
    { codigo: "POLO57", cor: "", gola: { quantidade: 0 }, punho: { quantidade: 0 } },
    { codigo: "POLO58", cor: "PRETO, VERM. E BRANCO", gola: { quantidade: 0 }, punho: { quantidade: 0 } },
    { codigo: "POLO59", cor: "VERMELHO C/ BRANCO", gola: { quantidade: 0 }, punho: { quantidade: 0 } },
    { codigo: "POLO60", cor: "VERDE 01", gola: { quantidade: 0 }, punho: { quantidade: 0 } },
    { codigo: "POLO61", cor: "VERDE 02", gola: { quantidade: 0 }, punho: { quantidade: 0 } },
    { codigo: "POLO62", cor: "CINZA C/ BRANCO", gola: { quantidade: 0 }, punho: { quantidade: 0 } },
    { codigo: "POLO63", cor: "AZUL C/ BRANCO", gola: { quantidade: 0 }, punho: { quantidade: 0 } },
    { codigo: "POLO64", cor: "PRETO, AZUL, BRANCO", gola: { quantidade: 0 }, punho: { quantidade: 0 } },
    { codigo: "POLO65", cor: "2 ANOS CIM", gola: { quantidade: 0 }, punho: { quantidade: 0 } },
    { codigo: "POLO66", cor: "4 E 6 ANOS CIM", gola: { quantidade: 0 }, punho: { quantidade: 0 } },
    { codigo: "POLO67", cor: "8 E 10 ANOS CIM", gola: { quantidade: 0 }, punho: { quantidade: 0 } },
    { codigo: "POLO68", cor: "2 ANOS SEMEADOR", gola: { quantidade: 0 }, punho: { quantidade: 0 } },
    { codigo: "POLO69", cor: "4 E 6 ANOS SEMEADOR", gola: { quantidade: 0 }, punho: { quantidade: 0 } },
    { codigo: "POLO70", cor: "8 E 10 ANOS SEMEADOR", gola: { quantidade: 0 }, punho: { quantidade: 0 } },
    { codigo: "POLO71", cor: "ABELARDO", gola: { quantidade: 0 }, punho: { quantidade: 0 } },
    { codigo: "POLO72", cor: "", gola: { quantidade: 0 }, punho: { quantidade: 0 } },
    { codigo: "POLO73", cor: "2 ANOS CONSTRUIR", gola: { quantidade: 0 }, punho: { quantidade: 0 } },
    { codigo: "POLO74", cor: "4 E 6 ANOS CONSTRUIR", gola: { quantidade: 0 }, punho: { quantidade: 0 } },
    { codigo: "POLO75", cor: "8 E 10 ANOS CONSTRUIR", gola: { quantidade: 0 }, punho: { quantidade: 0 } },
    { codigo: "POLO76", cor: "AZUL CLARO C/ BRANCO", gola: { quantidade: 0 }, punho: { quantidade: 0 } },
    { codigo: "POLO77", cor: "VERDE BANDEIRA C/ LISTA", gola: { quantidade: 0 }, punho: { quantidade: 0 } },
    { codigo: "POLO78", cor: "", gola: { quantidade: 0 }, punho: { quantidade: 0 } },
    { codigo: "POLO79", cor: "AMARELO 04", gola: { quantidade: 0 }, punho: { quantidade: 0 } },
    { codigo: "POLO80", cor: "VERDE C/ BRANCO", gola: { quantidade: 0 }, punho: { quantidade: 0 } },
    { codigo: "POLO81", cor: "MARINHO", gola: { quantidade: 0 }, punho: { quantidade: 0 } },
    { codigo: "POLO82", cor: "LARANJA", gola: { quantidade: 0 }, punho: { quantidade: 0 } },
    { codigo: "POLO83", cor: "MARINHO 02", gola: { quantidade: 0 }, punho: { quantidade: 0 } },
    { codigo: "POLO84", cor: "VINHO", gola: { quantidade: 0 }, punho: { quantidade: 0 } },
    { codigo: "POLO85", cor: "AZUL CELESTE", gola: { quantidade: 0 }, punho: { quantidade: 0 } },
    { codigo: "POLO86", cor: "VERDE BANDEIRA", gola: { quantidade: 0 }, punho: { quantidade: 0 } },
    { codigo: "POLO87", cor: "VERDE MUSGO", gola: { quantidade: 0 }, punho: { quantidade: 0 } },
    { codigo: "POLO88", cor: "MARINHO 03", gola: { quantidade: 0 }, punho: { quantidade: 0 } },
    { codigo: "POLO89", cor: "CINZA CHUMBO", gola: { quantidade: 0 }, punho: { quantidade: 0 } },
    { codigo: "POLO90", cor: "MARINHO C/ BRANCO", gola: { quantidade: 0 }, punho: { quantidade: 0 } },
    { codigo: "POLO91", cor: "VERDE ESCURO", gola: { quantidade: 0 }, punho: { quantidade: 0 } },
    { codigo: "POLO92", cor: "", gola: { quantidade: 0 }, punho: { quantidade: 0 } },
    { codigo: "POLO93", cor: "", gola: { quantidade: 0 }, punho: { quantidade: 0 } },
  ];

// Função para adicionar os dados ao banco
async function seedPolos() {
    try {
      for (const polo of polosData) {
        await prisma.polo.create({
          data: {
            codigo: polo.codigo,
            cor: polo.cor,
            gola: {
              create: {
                quantidade: polo.gola.quantidade, // Apenas quantidade, sem poloCodigo
              },
            },
            punho: {
              create: {
                quantidade: polo.punho.quantidade, // Apenas quantidade, sem poloCodigo
              },
            },
          },
        });
      }
      console.log('Todos os polos foram inseridos com sucesso!');
    } catch (error) {
      console.error('Erro ao inserir os dados:', error);
    } finally {
      await prisma.$disconnect();
    }
  }

  async function criarUsuario(nome, eAdmin = 1) {
    try {
      const novoUsuario = await prisma.usuarios.create({
        data: {
          nome,
          Eadmin: eAdmin,
        },
      });
      return { success: true, usuario: novoUsuario };
    } catch (error) {
      return { success: false, message: "Erro ao criar usuário", error: error.message };
    }
  }

  criarUsuario('Cleilson')

//   // Deletar todos os registros de Gola
// await prisma.gola.deleteMany({});

// // Deletar todos os registros de Punho
// await prisma.punho.deleteMany({});

// // Deletar todos os registros de Polo
// await prisma.polo.deleteMany({});

  
//seedPolos();