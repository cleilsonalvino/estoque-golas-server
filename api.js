import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();

app.use(cors()); 
app.use(express.json());

app.post("/login", async (req, res) => {
  const { nome, senha } = req.body;

  try {
    const usuario = await prisma.usuarios.findUnique({ where: { nome } });

    if (!usuario) {
      return res.status(401).json({ autenticado: false, mensagem: "Usuário não encontrado" });
    }

    if (usuario.senha !== senha) {
      return res.status(401).json({ autenticado: false, mensagem: "Senha incorreta" });
    }

    res.status(200).json({ autenticado: true, mensagem: "Login bem-sucedido", usuario });

  } catch (error) {
    console.error("Erro ao verificar usuário:", error);
    res.status(500).json({ autenticado: false, mensagem: "Erro no servidor" });
  }
});

app.get("/usuarios", async (req, res) => {
  try {
    const usuarios = await prisma.usuarios.findMany();
    res.status(200).json(usuarios);
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
    res.status(500).json({ error: "Erro interno ao buscar usuários" });
  }
});

app.delete("/usuarios/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const usuario = await prisma.usuarios.delete({
      where: {
        id: parseInt(id), // Converte o ID para inteiro
      },
    });
    res.status(200).json({ message: "Usuário excluído com sucesso", usuario });
  } catch (error) {
    console.error("Erro ao excluir usuário:", error);
    res.status(400).json({ error: "Erro ao excluir usuário" });
  }
});

app.post('/novousuario', async (req, res) => {
  const { nome, Eadmin } = req.body;

  try {
    const novoUsuario = await prisma.usuarios.create({
      data: { 
        nome,
        Eadmin // Certifique-se que está igual ao modelo do Prisma
      }
    });

    res.status(201).json(novoUsuario);
  } catch (error) {
    console.error('Erro ao criar novo usuário:', error);
    res.status(500).json({ erro: "Erro ao criar usuário" });
  }
});

app.post('/polos', async (req, res) => {
  try {
    const { codigo, cor, gola, punho } = req.body;

    if (!codigo || !cor || !gola?.quantidade || !punho?.quantidade) {
      throw new Error('Todos os campos (codigo, cor, gola.quantidade, punho.quantidade) são obrigatórios');
    }

    const novoPolo = await prisma.polo.create({
      data: {
        codigo,
        cor,
        gola: { create: { quantidade: Number(gola.quantidade) } },
        punho: { create: { quantidade: Number(punho.quantidade) } }
      },
      include: { gola: true, punho: true }
    });

    res.status(201).json({ message: 'Polo criado com sucesso', data: novoPolo });
  } catch (error) {
    res.status(400).json({ message: 'Erro ao criar Polo', error: error.message });
  }
});

app.post('/atualizar-polo/:codigo', async (req, res) => {
  const { codigo } = req.params;
  const { cor, gola, punho } = req.body;

  try {
    const poloAtualizado = await prisma.polo.update({
      where: { codigo },
      data: {
        cor,
        gola: gola ? { update: { quantidade: Number(gola.quantidade) } } : undefined,
        punho: punho ? { update: { quantidade: Number(punho.quantidade) } } : undefined
      },
      include: { gola: true, punho: true }
    });

    res.json(poloAtualizado);
  } catch (error) {
    console.error("Erro ao atualizar polo:", error);
    res.status(500).json({ mensagem: "Erro ao atualizar o polo no banco de dados" });
  }
});

//teste

app.get('/filtrar/:cor', async (req, res) => {
  const { cor } = req.params;

  try {
    const polos = await prisma.polo.findMany({
      where: { cor },
      include: { gola: true, punho: true }
    });

    if (polos.length === 0) {
      return res.status(404).json({ mensagem: "Nenhum polo encontrado com essa cor" });
    }

    res.json(polos);
  } catch (error) {
    console.error("Erro ao filtrar polos por cor:", error);
    res.status(500).json({ mensagem: "Erro ao filtrar polos no banco de dados" });
  }
});

app.get('/select-func', async (req, res) => {
  try {
    const usuarios = await prisma.usuarios.findMany({
      select: { id: true, nome: true }
    });

    res.json(usuarios);
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
    res.status(500).json({ mensagem: "Erro ao buscar dados no banco de dados" });
  }
});

app.get('/trazer-dados', async (req, res) => {
  try {
    const dados = await prisma.polo.findMany({
      select: {
        codigo: true,
        cor: true,
        gola: { select: { quantidade: true } },
        punho: { select: { quantidade: true } }
      },
      orderBy: { codigo: 'asc' }
    });

    res.json(dados);
  } catch (error) {
    console.error("Erro ao buscar dados:", error);
    res.status(500).json({ mensagem: "Erro ao buscar dados no banco de dados" });
  }
});

app.post("/estoque", async (req, res) => {
  const { codigoPolo, quantidade, tipo, golaPunho } = req.body;

  try {
    const polo = await prisma.polo.findUnique({ where: { codigo: codigoPolo } });
    if (!polo) return res.status(400).json({ success: false, message: "Polo não encontrado!" });

    const tabela = golaPunho === "gola" ? prisma.gola : prisma.punho;
    const item = await tabela.findUnique({ where: { poloCodigo: codigoPolo } });

    if (!item) return res.status(400).json({ success: false, message: "Item não encontrado!" });

    if (tipo === "entrada") {
      await tabela.update({
        where: { poloCodigo: codigoPolo },
        data: { quantidade: item.quantidade + quantidade }
      });
    } else if (tipo === "saida") {
      if (item.quantidade < quantidade) {
        return res.status(400).json({ success: false, message: "Quantidade insuficiente!" });
      }
      await tabela.update({
        where: { poloCodigo: codigoPolo },
        data: { quantidade: item.quantidade - quantidade }
      });
    } else {
      return res.status(400).json({ success: false, message: "Tipo inválido. Use 'entrada' ou 'saida'." });
    }

    return res.status(200).json({ success: true, message: "Operação realizada com sucesso!" });

  } catch (error) {
    console.error("Erro no estoque:", error);
    res.status(500).json({ success: false, message: "Erro ao processar a requisição." });
  }
});

async function startServer() {
  try {
    await prisma.$connect();
    console.log('Banco conectado!');
    app.listen(4000, () => console.log('Servidor rodando na porta 4000'));
  } catch (error) {
    console.error('Erro ao conectar ao banco:', error);
    process.exit(1);
  }
}

startServer();
