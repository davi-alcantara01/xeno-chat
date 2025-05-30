const express = require('express');
const app = express();
const router = express.Router();
const UserController = require('../controllers/UserController');
const ChatController = require('../controllers/ChatController');

router.post('/user/create', UserController.create);
router.post('/user/login', UserController.login);
router.post('/user/verify', UserController.verifyToken);

router.post('/chats', ChatController.getChats);
router.post('/chats/create', ChatController.createChat);
router.post('/chats/members/add', ChatController.addMember);
router.post('/chats/enter', ChatController.enterChat);
router.post('/chats/token', ChatController.generateChatToken);



module.exports = router;