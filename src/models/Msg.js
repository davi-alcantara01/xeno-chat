const knex = require('../../connections/database');
const Chat = require('../models/Chat');


class Message {
  async saveMsg(user_id, chat_id, content) {
    let control = false;

    let chatMembers = await Chat.getChatMembers(chat_id);
    

    chatMembers.data.forEach(member => {
      if (member.id == user_id) {
        control = true;
        return
      }
    });

    if (control == false) {
      return { status: false, msg: "User has no permition to send message in this chat" }
    }
    try {
      let msg = {
        sender_id: user_id,
        chat_id: chat_id,
        content: content
      };
      await knex("messages").insert(msg);
      return { status: true, error: undefined}
    } catch (error) {
      return { status: false, error: error }
    }


  }

  async getMsg(chat_id) {


    try {
      let messages = await knex("messages").select().where({chat_id: chat_id});
      return { status: true, error: undefined, data: messages}
    } catch (error) {
      return { status: false, error: error, data: undefined}
    }
  }
}

module.exports = new Message;