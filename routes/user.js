const express = require('express')

const userController = require('../controllers/user');

const router = express.Router();

router.post('/postUser', userController.postUser);
router.post('/postLogin', userController.postLogin)

module.exports = router;

