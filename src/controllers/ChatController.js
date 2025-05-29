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

  
}

module.exports = new ChatController;