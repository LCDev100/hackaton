const express = require('express');
const router = express.Router();

const api = require('../controllers/nickname.controller.js');

router.post('/registrar',api.registrar);

router.post('/consulta',api.buscar);

module.exports = router;