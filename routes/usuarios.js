const express = require('express');
const router = express.Router();
const connection = require('../database/connection');

// GET /usuarios
router.get('/', async (req, res) => {
  try {
    const usuarios = await connection('usuarios').select('*');
    res.json(usuarios);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar usuários' });
  }
});

// GET /usuarios/:id
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await connection('usuarios').where({ id }).first();
    if (!usuario) return res.status(404).json({ erro: 'Usuário não encontrado' });
    res.json(usuario);
  } catch (err) {
    res.status(500).json({ erro: 'Erro interno' });
  }
});

// POST /usuarios
router.post('/', async (req, res) => {
  const { nome, email } = req.body;
  if (!nome || !email) return res.status(400).json({ erro: 'Nome e email obrigatórios' });

  try {
    await connection('usuarios').insert({ nome, email });
    res.status(201).json({ mensagem: 'Usuário criado com sucesso' });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao criar usuário' });
  }
});

// PUT /usuarios/:id
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, email } = req.body;

    const usuario = await connection('usuarios').where({ id }).first();
    if (!usuario) return res.status(404).json({ erro: 'Usuário não encontrado' });

    await connection('usuarios').where({ id }).update({ nome, email });
    res.json({ mensagem: 'Usuário atualizado com sucesso' });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao atualizar usuário' });
  }
});

// DELETE /usuarios/:id
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await connection('usuarios').where({ id }).first();
    if (!usuario) return res.status(404).json({ erro: 'Usuário não encontrado' });

    await connection('usuarios').where({ id }).delete();
    res.json({ mensagem: 'Usuário deletado com sucesso' });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao deletar usuário' });
  }
});

module.exports = router;
