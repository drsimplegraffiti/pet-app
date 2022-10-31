const express = require('express');
const router = express.Router();
const { signUpUser, signInUser, updateUser } = require('../controllers/auth');
const { isAuthenticated } = require('../middleware/auth');

router.post('/signup', signUpUser);
router.post('/login', signInUser);
router.put('/:id', isAuthenticated, updateUser);

module.exports = router;
