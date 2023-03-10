const express = require('express')
const Authorization = require('../middleware/auth')

const messageControllers = require('../controllers/message')

const router = express.Router();

router.post('/postMessage', Authorization.authenticate ,messageControllers.postMessage);
router.get('/getMessage', Authorization.authenticate ,messageControllers.getMessage);
module.exports = router;