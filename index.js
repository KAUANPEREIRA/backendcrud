const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

// Importar rotas
const usuariosRoutes = require('./routes/usuarios');
const relatoriosRoutes = require('./routes/relatorios');

// Usar as rotas
app.use('/usuarios', usuariosRoutes);
app.use('/relatorio', relatoriosRoutes);

app.listen(3000, () => {
  console.log('🚀 Servidor rodando em http://localhost:3000');
});
