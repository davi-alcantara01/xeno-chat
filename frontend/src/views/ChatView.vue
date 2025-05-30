<template>
  <div class="container">
    
    <h1>Sala de chats</h1>
    <table class="table table-success">
      <thead>
        <tr>
          <th scope="col">Chat Name</th>
          <th scope="col">Token</th>
          <th scope="col">Quit chat</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="chat in chats" :key="chat.id">
          <td>{{ chat.chat_name }}</td>
          <td> <button @click="generateToken(chat.id)" class="btn btn-success">Generate token</button> </td>
          <td> <button class="btn btn-danger">Exit chat</button></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios'



export default {
  data() {
    return {
      chats: []

    }
  },
  created: async function() {
    let token = localStorage.getItem('token');
    try {
      let chats = await axios.post('http://localhost:3000/chats', {token: token})
      this.chats = chats.data.chats;
      console.log(this.chats)
    } catch (error) {
      console.log("Error: " + error);
      this.$router.push({name: 'login'})
    }
  },
  methods: {
    async generateToken(chat_id) {
      try {
        let token = await axios.post('http://localhost:3000/chats/token', {id: chat_id});
        console.log(token.data.token);
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style>

</style>