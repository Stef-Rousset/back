const express = require('express');
const router = express.router();


const userController = require('../controllers/user');

router.post('/signup', userController.signup);
router.post('/login', userController.login);


modules.exports = router;
