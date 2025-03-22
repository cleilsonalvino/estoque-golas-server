import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();

app.use(cors()); // Permite qualquer origem acessar o seu backend
app.use(express.json());

app.post("/login", async (req, res) => {
  const { nome, senha } = req.body;

  try {
      // Buscar usuário pelo nome
      const usuario = await prisma.usuarios.findUnique({
          where: { nome: nome }
      });

      // Se não encontrou o usuário, retorna erro
      if (!usuario) {
          return res.status(401).json({ autenticado: false, mensagem: "Usuário não encontrado" });
      }

      // Verificar se a senha corresponde
      if (usuario.senha !== senha) {
          return res.status(401).json({ autenticado: false, mensagem: "Senha incorreta" });
      }

      // Se tudo estiver correto, retorna sucesso
      res.status(200).json({ autenticado: true, mensagem: "Login bem-sucedido", usuario });

  } catch (error) {
      console.error("Erro ao verificar usuário:", error);
      res.status(500).json({ autenticado: false, mensagem: "Erro no servidor" });
  }
});

app.post('/novousuario', async (req, res) => {
  const { nome, eadmin } = req.body;

  try {
    const novoUsuario = await prisma.usuarios.create({
      data: { // Corrigido: precisa do campo "data"
        nome: nome,
        Eadmin: eadmin 
      }
    });

    res.status(201).json(novoUsuario);
  } catch (error) {
    console.error('Falha ao criar novo usuário:', error);
    res.status(500).json({ erro: "Erro ao criar usuário" }); // Retorna resposta de erro
  }
});

app.post('/polos', async (req, res) => {
  try {
    const { codigo, cor, gola, punho } = req.body;

    // Validação dos campos obrigatórios
    if (!codigo || !cor || !gola || !punho || !gola.quantidade || !punho.quantidade) {
      throw new Error('Todos os campos (codigo, cor, gola.quantidade, punho.quantidade) são obrigatórios');
    }

    // Criar o Polo com Gola e Punho
    const novoPolo = await prisma.polo.create({
      data: {
        codigo,
        cor,
        gola: {
          create: {
            quantidade: gola.quantidade,
          },
        },
        punho: {
          create: {
            quantidade: punho.quantidade,
          },
        },
      },
      include: {
        gola: true,
        punho: true,
      },
    });

    res.status(201).json({
      message: 'Polo criado com sucesso',
      data: novoPolo,
    });
  } catch (error) {
    res.status(400).json({
      message: 'Erro ao criar Polo',
      error: error.message,
    });
  }
});

app.post('/atualizar-polo/:codigo', async (req, res) => {
  const { codigo } = req.params; // Pega o código da URL
  const { cor, gola, punho } = req.body; // Pega os dados do corpo da requisição

  try {
    const poloAtualizado = await prisma.polo.update({
      where: { codigo: codigo }, // Usa o código como chave única
      data: {
        cor, // Atualiza apenas os campos enviados
        gola: gola ? { update: { quantidade: Number(gola.quantidade) } } : undefined,
        punho: punho ? { update: { quantidade: Number(punho.quantidade) } } : undefined,
      },
    });
    res.json(poloAtualizado);
  } catch (error) {
    console.error("Erro ao atualizar polo:", error);
    res.status(500).json({ mensagem: "Erro ao atualizar o polo no banco de dados" });
  }
});

app.get('/filtrar/:cor', async (req, res) => {
  const { cor } = req.params; // Pega a cor da URL

  try {
    const polos = await prisma.polo.findMany({
      where: {
        cor: cor, // Filtra polos pela cor fornecida
      },
      include: {
        gola: true, // Inclui a relação com a Gola
        punho: true, // Inclui a relação com o Punho
      },
    });

    if (polos.length === 0) {
      return res.status(404).json({ mensagem: "Nenhum polo encontrado com essa cor" });
    }

    res.json(polos); // Retorna os polos encontrados
  } catch (error) {
    console.error("Erro ao filtrar polos por cor:", error);
    res.status(500).json({ mensagem: "Erro ao filtrar polos no banco de dados" });
  }
});


app.get('/select-func', async (req, res)=>{
  try{
    const usuarios = await prisma.usuarios.findMany({
      select: {
        id:true,
        nome: true
      }
    })

    res.json(usuarios)
  } catch(error){
    console.error("Erro ao buscar usuários:", error);
    res.status(500).json({ mensagem: "Erro ao buscar dados no banco de dados" });
  }
})

app.get('/trazer-dados', async (req, res) => {
  try {
    const dados = await prisma.polo.findMany({
      select: {
        codigo: true,
        cor: true,
        gola: {
          select: {
            quantidade: true
          }
        },
        punho: {
          select: {
            quantidade: true
          }
        }
      },
      orderBy: {
        codigo: 'asc'
      }
    });
    res.json(dados);
  } catch (error) {
    console.error("Erro ao buscar dados:", error);
    res.status(500).json({ mensagem: "Erro ao buscar dados no banco de dados" });
  }
});

// Rota para registrar entrada/saída de golas/punhos
app.post("/estoque", async (req, res) => {
  const { codigoPolo, quantidade, tipo, golaPunho } = req.body;

  // Verifica se o polo existe
  const polo = await prisma.polo.findUnique({
    where: {
      codigo: codigoPolo,
    },
  });

  if (!polo) {
    return res.status(400).json({ success: false, message: "Polo não encontrado!" });
  }

  try {
    // Verifica se a operação é sobre a gola ou punho
    if (golaPunho === "gola") {
      const gola = await prisma.gola.findUnique({
        where: {
          poloCodigo: codigoPolo,
        },
      });

      // Verifica tipo de operação (entrada ou saída)
      if (tipo === "entrada") {
        await prisma.gola.update({
          where: { poloCodigo: codigoPolo },
          data: {
            quantidade: gola ? gola.quantidade + quantidade : quantidade,
          },
        });
      } else if (tipo === "saida") {
        // Verifica se há golas suficientes para a saída
        if (gola && gola.quantidade >= quantidade) {
          await prisma.gola.update({
            where: { poloCodigo: codigoPolo },
            data: {
              quantidade: gola.quantidade - quantidade,
            },
          });
        } else {
          return res.status(400).json({ success: false, message: "Quantidade insuficiente de golas!" });
        }
      } else {
        return res.status(400).json({ success: false, message: "Tipo inválido. Use 'entrada' ou 'saida'." });
      }
    } else if (golaPunho === "punho") {
      const punho = await prisma.punho.findUnique({
        where: {
          poloCodigo: codigoPolo,
        },
      });

      // Verifica tipo de operação (entrada ou saída)
      if (tipo === "entrada") {
        await prisma.punho.update({
          where: { poloCodigo: codigoPolo },
          data: {
            quantidade: punho ? punho.quantidade + quantidade : quantidade,
          },
        });
      } else if (tipo === "saida") {
        // Verifica se há punhos suficientes para a saída
        if (punho && punho.quantidade >= quantidade) {
          await prisma.punho.update({
            where: { poloCodigo: codigoPolo },
            data: {
              quantidade: punho.quantidade - quantidade,
            },
          });
        } else {
          return res.status(400).json({ success: false, message: "Quantidade insuficiente de punhos!" });
        }
      } else {
        return res.status(400).json({ success: false, message: "Tipo inválido. Use 'entrada' ou 'saida'." });
      }
    } else {
      return res.status(400).json({ success: false, message: "golaPunho deve ser 'gola' ou 'punho'." });
    }

    return res.status(200).json({ success: true, message: "Entrada/saída registrada com sucesso!" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Erro ao processar a requisição." });
  }
});



async function startServer() {
  try {
    await prisma.$connect();
    console.log('Banco conectado!');
    app.listen(3000, () => {
      console.log('Servidor rodando na porta 3000');
    });
  } catch (error) {
    console.error('Erro ao conectar ao banco:', error);
    process.exit(1); // Encerra o processo se a conexão falhar
  }
}

startServer();

