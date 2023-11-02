const express = require('express');
const router = express.Router();

const api = require('../controllers/api.sabi.controller');

router.get('/hello',api.get);

module.exports = router;