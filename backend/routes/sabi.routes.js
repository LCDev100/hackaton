const express = require('express');
const router = express.Router();

const api = require('../controllers/sabi.controller');

router.get('/hello',api.get);

router.post('/consulta',api.consultar); // { "role": "user", "content": "Hola" }

router.post('/consultaryregistrarchat',api.consultarYRegistrarChat); // { "content": "hola", "nickname": "Patito", "tema": "Salud", "fechaYHora": "02-11-2023 11:42" }

router.post('/consultaryregistrarchatconcontexto',api.consultarYRegistrarChatConContexto); // { "content": "hola", "nickname": "Patito", "tema": "Salud", "fechaYHora": "02-11-2023 11:42" }

router.post('/consultarchats',api.consultarChats); // { "nickname": "Patito" }

module.exports = router;