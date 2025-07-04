const express = require('express');
const app = express();
const router = express.Router();
const UserController = require('../controllers/UserController');
const ChatController = require('../controllers/ChatController');
const MsgController = require("../controllers/MsgController");

router.post('/user/create', UserController.create);
router.post('/user/login', UserController.login);
router.post('/user/verify', UserController.verifyToken);

router.post('/chats', ChatController.getChats);
router.post('/chats/create', ChatController.createChat);
router.post('/chats/members/add', ChatController.addMember);
router.post('/chats/enter', ChatController.enterChat);
router.post('/chats/token', ChatController.generateChatToken);
router.post('/chats/exit', ChatController.exitChat);

router.post('/message/save', MsgController.save);
router.post('/message/get', MsgController.getMsg);


module.exports = router;