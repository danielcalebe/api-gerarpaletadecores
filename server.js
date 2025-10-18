// ============================
// 🎨 API de Paleta de Cores
// ============================

const express = require('express');
const cors = require('cors');
const tinycolor = require('tinycolor2');

const app = express();
const PORT = 3000;

app.use(cors());

// 🟢 Função: gera uma cor HEX aleatória
function gerarCorHex() {
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);
  return `#${randomColor.padStart(6, '0')}`;
}

// 🎨 Função: gera uma paleta harmônica (análogas e complementar)
function gerarPaleta(baseHex) {
  const base = tinycolor(baseHex);

  return {
    base: base.toHexString(),
    análoga1: base.analogous()[1].toHexString(),
    análoga2: base.analogous()[2].toHexString(),
    complementar: base.complement().toHexString(),
  };
}

// 📡 Endpoint principal
// Exemplo: /api/paleta?cor=#ff6600
app.get('/api/paleta', (req, res) => {
  const { cor } = req.query;
  const corBase = cor && tinycolor(cor).isValid() ? cor : gerarCorHex();

  const paleta = gerarPaleta(corBase);
  res.json({
    cor_base: corBase,
    paleta,
  });
});

// 🚀 Inicia o servidor
app.listen(PORT, () => {
  console.log(`✅ Servidor rodando em: http://localhost:${PORT}/api/paleta`);
});
