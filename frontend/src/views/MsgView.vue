<template>
  <div class="container">
    <h1>{{ chatName }}</h1>
    <div id="chat">
      <div  v-for="message in messages" :key="message.id" >
        <div class="container-msg"><span class="msg">{{ message.sender }}: {{ message.content }}</span></div>
      </div>

    </div>
    <input type="text" v-model="msg" class="form-control" id="msg" placeholder="Digite sua mensagem aqui">
    <br>
    <div class="d-grid gap-2">
     <button id="btn" @click="send()" class="btn btn-primary btn-lg">Enviar</button> 
    </div>

  </div>
</template>

<script>
import axios from 'axios';
import {io} from 'socket.io-client'

const socket = io('http://localhost:3000');

export default {
  props: ['chatName'],
  data() {
    return {
      chat_id: this.$route.query.chat_id,
      messages: [],
      msg: ''
    }
  },
  created: async function() {
    try {
      let result = await axios.post("http://localhost:3000/message/get", {chat_id: this.chat_id});
      console.log(result);
      this.messages = result.data.messages;
      
    } catch (error) {
      console.log(error);
      
    }
  },

  methods: {
    send() {
      if (this.msg.trim() === '' || this.msg == undefined) {
        return
      }
      let data = {
        token: localStorage.getItem('token'),
        content: this.msg,
        chat_id: this.$route.query.chat_id
      }
      socket.emit('send_message', data);
      this.msg = '';
    }
  },
  mounted() {
    socket.emit('connection');
    let data = {
      token: localStorage.getItem('token'),
      chat_id: this.$route.query.chat_id
    }
    socket.emit('join', data);
    socket.on('update', data => {
      this.messages.push(data);
    });
  }


}
</script>

<style>
  #chat {
    height: 70vh;
    width: 100%;
    background-color: rgb(170, 255, 227);
    overflow-y: scroll;
  }
  .container-msg {
    margin-top: 6px;
    display: flex;
    justify-content: flex-start;
  }

  .msg {
    font-size: 1.3em;
    background-color: beige;
    padding: 6px 12px;
    border-radius: 50px;
    max-width: 70%;
    word-wrap: break-word;
  }
</style>