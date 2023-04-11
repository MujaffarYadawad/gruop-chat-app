const express = require('express')
const Authorization = require('../middleware/auth')

const messageControllers = require('../controllers/message')

const router = express.Router();

router.post('/tostore/:id', Authorization.authenticate , messageControllers.addMsg);
router.get('/toget/:id', Authorization.authenticate , messageControllers.getMsg);
router.get('/localmsg', Authorization.authenticate , messageControllers.getMsgOnLimit);

module.exports = router;