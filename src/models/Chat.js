const knex = require('../../connections/database');

class Chat {
  async getChats(user_id) {
    try {
      let chats = await knex('chat_members')
        .join('users', 'chat_members.user_id', 'users.id')
        .join('chats', 'chat_members.chat_id', 'chats.id')
        .select('chats.chat_name')
        .where({user_id: user_id})
      return {status: true, error: undefined, data: chats}
    } catch (error) {
      console.log(error);
      return {status: false, error: error, data: undefined}
    }
  }


  async createChat(is_group, name) {
    try {
      await knex('chats').insert({is_group: is_group, chat_name: name});
      return {status: true, error: undefined, msg: "chat created successfully"}
    } catch (error) {
      console.log(error);
      return {status: false, error: error, msg: undefined}
    }
  }
}

module.exports = new Chat;
