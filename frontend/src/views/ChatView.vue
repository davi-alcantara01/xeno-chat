<template>
  <div class="container">
    
    <h1>Sala de chats</h1>
    <table class="table table-success">
      <thead>
        <tr>
          <th scope="col">Chat Name</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="chat in chats" :key="chat.id">
          <td>{{ chat.chat_name }}</td>
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
    

  }
}
</script>

<style>

</style>