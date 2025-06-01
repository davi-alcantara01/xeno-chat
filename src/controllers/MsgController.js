const Msg = require("../models/Msg");
const jwt = require("jsonwebtoken");

class MsgController {
  async save(req, res) {
    let {chat_id, token_user, content} = req.body;

    if (chat_id == undefined || isNaN(chat_id)) {
      res.status(400);
      res.json({error: "chat_id is required"});
      return
    }

    if (token_user == undefined) {
      res.status(400);
      res.json({error: "token_user is required"});
      return
    }

    if (content == undefined) {
      res.status(400);
      res.json({error: "content is required"});
      return
    }

    let user = jwt.decode(token_user);

    try {
      user.id
    } catch (error) {
      res.status(400);
      res.json({error: "Invalid token"});
      return
    }

    try {
      let result = await Msg.saveMsg(user.id, chat_id, content);
      if (result.status == true) {
        res.json({msg: "Message was sent"});
        return
      } else {
        res.status(400);
        res.json({error: result.error});
        return
      }
      
    } catch (error) {
      res.status(400);
      res.json({error: error});
      return
    }

  }

  async getMsg(req, res) {
    let { chat_id } = req.body;
    if (chat_id == undefined || isNaN(chat_id)) {
      res.status(400);
      res.json({error: "chat_id is required"})
      return
    }

    let result = await Msg.getMsg(chat_id);

    if (result.status == false) {
      res.status(400);
      res.json({error: result.error});
      return
    } else {
      let messages = result.data;
      res.json({messages: messages});
      return
    }
    
  }


}

module.exports = new MsgController;