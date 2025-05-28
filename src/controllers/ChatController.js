const Chat = require('../models/Chat');

class ChatController {
  async getChats(req, res) {
    let { id } = req.body;
    if (isNaN(id)) {
      res.status(400);
      res.json({error: "id not acceptable"});
      return 
    }    

    let chats = await Chat.getChats(id);
    res.json({chats: chats.data});

  }

  async createChat(req, res) {
    let { name, is_group } = req.body;

    if (name == undefined || name.trim() === '') {
      res.status(400);
      res.json({error: "Name is required"})
      return
    }
    if (is_group == undefined || isNaN(is_group)) {
      res.status(400);
      res.json({error: "is_group is required"})
      return
    }

    let result = await Chat.createChat(is_group, name);

    if (result.status == false) {
      console.log(result.error);
      res.status(400);
      res.json({error: result.error});
    } else {
      res.json({msg: result.msg});
    }

    
    

  }
}

module.exports = new ChatController;