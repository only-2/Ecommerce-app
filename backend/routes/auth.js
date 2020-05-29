const express = require('express');
const authController = require('../controllers/auth');

const router = express.Router();

router.get('/login', authController.Login);
router.post('/signup', authController.Signup);

module.exports = router;