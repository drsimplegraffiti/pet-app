const express = require('express');
const router = express.Router();

const { subscribeNewsLetter } = require('../controllers/newsLetter');

router.post('/', subscribeNewsLetter);

module.exports = router;
