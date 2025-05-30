const jwt = require('jsonwebtoken');
const knex = require('../../connections/database');

const secretKey = process.env.JWT_SECRET_KEY;



class Chat {
  async getChats(user_id) {
    try {
      let chats = await knex('chat_members')
        .join('users', 'chat_members.user_id', 'users.id')
        .join('chats', 'chat_members.chat_id', 'chats.id')
        .select('chats.chat_name', 'chats.id')
        .where({user_id: user_id})
      return {status: true, error: undefined, data: chats}
    } catch (error) {
      console.log(error);
      return {status: false, error: error, data: undefined}
    }
  }

  async getChatById(chat_id, user_id) {
    let chats = await this.getChats(user_id);
    let chatt = undefined;
    

    chats.data.forEach(chat => {
      if (chat.id == chat_id) {        
        chatt = chat
      }
    });

    return chatt

  }

  async getChatMembers(chat_id) {

    try {
      let users = await knex('chat_members')
        .join('users', 'chat_members.user_id', 'users.id')
        .join('chats', 'chat_members.chat_id', 'chats.id')
        .select('users.*')
        .where({chat_id: chat_id});
      
      return {status: true, data: users}
      
    } catch (error) {
      return {status: false, data: error}
    }
    
  }

  async createChat(is_group, name, user_id) {
    try {
      let chat_id = await knex('chats').insert({is_group: is_group, chat_name: name});
      await knex('chat_members').insert({user_id: user_id, chat_id: chat_id[0]});
      
      return {status: true, error: undefined, msg: "chat created successfully"}
    } catch (error) {
      console.log(error);
      return {status: false, error: error, msg: undefined}
    }
  }

  async addMembers(member_id, chat_id, user_id) {

    let chat = await this.getChatById(chat_id, user_id);
    let control = false;

    if (chat == undefined) {
      return { status: false, msg: "Chat not found" }
    }

    let chatMembers = await this.getChatMembers(chat_id);
    

    chatMembers.data.forEach(member => {
      if (member.id == member_id) {
        control = true;
        return 
      }
    });

    if (control) {
      return { status: false, msg: "User is already in chat"}
    }

    try {
      await knex('chat_members').insert({user_id: member_id, chat_id: chat_id});
      return { status: true, msg: "User add on chat"}
    } catch (error) {
      console.log(error);
      return { status: false, msg: error }
    }
  }

  async enterChat(user_id, chat_id) {
    let control = false;

    let chatMembers = await this.getChatMembers(chat_id);
    

    chatMembers.data.forEach(member => {
      if (member.id == user_id) {
        control = true;
        return
      }
    });

    if (control) {
      return { status: false, msg: "User is already in chat"}
    }
    try {
      await knex('chat_members').insert({user_id: user_id, chat_id: chat_id});
      return { status: true, msg: "User add on chat"}
    } catch (error) {
      return { status: false, msg: error }
    }
  }

  async generateChatToken(chat_id) {
    let chat = await knex('chats').select().where({ id: chat_id});
    let token = jwt.sign(chat[0], secretKey);
    if (chat.length == 0) {
      return { status: false, data: undefined, error: "Chat not found"}
    } else {
      return { status: true, data: token, error: undefined}
    }


  }
}

module.exports = new Chat;
