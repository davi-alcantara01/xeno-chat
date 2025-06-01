const jwt = require('jsonwebtoken');
const Msg = require('../models/Msg');

module.exports = (io) => {
  io.on('connection', (socket) => {
    socket.on('join', (data) => {
      try {
        let user = jwt.decode(data.token);
        console.log("Usuário: " + user.username + " joined the chat");
        socket.join(data.chat_id);
      } catch (error) {
        console.log("Erro ao se conctar ao servidor: " + error);
        return
      }
      
    });


    socket.on('send_message', async (data) => {
      if (data == undefined) {
        console.log("Mensagem não enviada");
        return
      }
      try {
        let token = data.token;
        let user = jwt.decode(token);
        await Msg.saveMsg(user.id, user.username, data.chat_id, data.content);
        io.to(data.chat_id).emit('update', {sender: user.username, content: data.content});
      } catch (error) {
        console.log(error);
      }
    });

    socket.on('disconnect', () => {
      console.log("Usuário desconectado: ", socket.id);
    })

  })
}