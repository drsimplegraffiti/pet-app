const express = require('express');
const router = express.Router();
const { contactUs } = require('../controllers/contact-us.controller');

router.post('/', contactUs);

module.exports = router;
