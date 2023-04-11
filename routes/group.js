const express = require('express');

const router = express.Router();

const groupController = require('../controllers/group');

const userAuthentication = require('../middleware/auth');

router.post('/toCreate', userAuthentication.authenticate,  groupController.groupCreation);

router.get('/allgroups', userAuthentication.authenticate, groupController.allGroups);

router.get('/groupid/:id', userAuthentication.authenticate, groupController.groupCheckAndFetch)

router.get('/toadduser', userAuthentication.authenticate, groupController.addUserToGroup)

router.get('/togetAllusers', groupController.allMembersInGroup)

router.put('/makeAdmin',userAuthentication.authenticate, groupController.makeAdmin)
 
router.delete('/deleteUser', userAuthentication.authenticate, groupController.deleteUser)

module.exports=router;