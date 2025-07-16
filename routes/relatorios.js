const express = require('express');
const router = express.Router();
const connection = require('../database/connection');


router.get('/total-usuarios', async (req, res) => {
  const result = await connection('usuarios').count('id as total');
  res.json({ total: result[0].total });
});


router.get('/ultimos', async (req, res) => {
  const usuarios = await connection('usuarios')
    .select('id', 'nome', 'email')
    .orderBy('id', 'desc')
    .limit(5);

  res.json(usuarios);
});


router.get('/dominio', async (req, res) => {
  const dominio = req.query.dominio;
  if (!dominio) return res.status(400).json({ erro: 'Informe o domínio: ?dominio=exemplo.com' });

  const total = await connection('usuarios')
    .where('email', 'like', `%@${dominio}`)
    .count('id as total');

  res.json({ dominio, total: total[0].total });
});

module.exports = router;
