const Chat = require('../models/Chat');
const jwt = require('jsonwebtoken');

class ChatController {
  async getChats(req, res) {
    let { token } = req.body;
    let user = jwt.decode(token);
    
    let id = user.id;
    if (isNaN(id)) {
      res.status(400);
      res.json({error: "id not acceptable"});
      return 
    }    

    let chats = await Chat.getChats(id);
    res.json({chats: chats.data});

  }

  async createChat(req, res) {
    let { name, is_group ,token } = req.body;

    if (name == undefined || name.trim() === '') {
      res.status(400);
      res.json({error: "Name is required"});
      return
    }
    if (is_group == undefined || isNaN(is_group)) {
      res.status(400);
      res.json({error: "is_group is required"});
      return
    }
    if (token == undefined) {
      res.status(400);
      res.json({error: "token is required"});
      return
    }
    let user = jwt.decode(token);

    let result = await Chat.createChat(is_group, name, user.id);

    if (result.status == false) {
      console.log(result.error);
      res.status(400);
      res.json({error: result.error});
    } else {
      res.json({msg: result.msg});
    }

    
    

  }

  async addMember(req, res) {
    let { member_id, chat_id, user_id } = req.body;

    if (chat_id == undefined || isNaN(chat_id)) {
      res.status(400);
      res.json({error: "chat_id is required"})
      return
    }

    if (member_id == undefined || isNaN(member_id)) {
      res.status(400);
      res.json({error: "member_id is required"})
      return
    }

    if (user_id == undefined || isNaN(user_id)) {
      res.status(400);
      res.json({error: "user_id is required"})
      return
    }

    let result = await Chat.addMembers(member_id, chat_id, user_id);

    if (result.status == false) {
      res.status(400);
      res.json({error: result.msg});
    } else {
      res.json({msg: "Adding successful"});
    }

  }

  async enterChat(req, res) {
    let { token_user, token_chat } = req.body;

    if (token_chat == undefined) {
      res.status(400);
      res.json({error: "token_chat is required"})
      return
    }

    if (token_user == undefined) {
      res.status(400);
      res.json({error: "token_user is required"})
      return
    }

    let user = jwt.decode(token_user);
    let chat = jwt.decode(token_chat);


    try {
      let test = user.id;
      let test2 = chat.id;
    } catch (error) {
      res.status(400);
      res.json({error: "Invalid Token"});
      return
    }

    let result = await Chat.enterChat(user.id, chat.id);

    if (result.status == false) {
      res.status(400);
      res.json({error: result.msg});
      return
    } else {
      res.json({msg: result.msg})
    }



  }

  async generateChatToken(req, res) {
    let { id } = req.body;

    if (id == undefined || isNaN(id)) {
      res.status(400);
      res.json({error: "Id is reequired"});
      return
    }

    let result = await Chat.generateChatToken(id);
    if (result.status == false) {
      res.json({error : result.error});
      return
    } else {
      res.json({token: result.data});
      return
    }

  }

  async exitChat(req, res) {
    let { id, user_token } = req.body;
    if (id == undefined || isNaN(id)) {
      res.status(400);
      res.json({error: "Id is required"});
      return
    }
    let user = jwt.decode(user_token);
    try {
      user.id
    } catch (error) {
      res.status(401);
      res.json({error: "Invalid token"});
      return
    }
    let result = await Chat.exitChat(id, user.id);
    if (result.status == false) {
      res.status(400);
      res.json({error: result.msg});
      return
    } else {
      res.json({msg: result.msg});
      return
    }
  }
}

module.exports = new ChatController;