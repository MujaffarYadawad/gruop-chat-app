const express = require('express')

const userController = require('../controllers/user');

const router = express.Router();

router.post('/postUser', userController.postUser);
router.post('/postLogin', userController.postLogin)
router.get("/allUsers", userController.getAlluser);

module.exports = router;

