const express = require('express');
const app = express();
const router = express.Router();
const UserController = require('../controllers/UserController');
const ChatController = require('../controllers/ChatController');

router.post('/user/create', UserController.create);
router.post('/user/login', UserController.login);

router.post('/chats', ChatController.getChats);
router.post('/createChat', ChatController.createChat);



module.exports = router;