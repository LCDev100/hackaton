const express = require('express');
const router = express.Router();

const api = require('../controllers/nickname.controller');

router.post('/registrar',api.registrar); // { "nickname": "Patito" }

router.post('/consultar',api.buscar); // { "nickname": "Patito" }

module.exports = router;