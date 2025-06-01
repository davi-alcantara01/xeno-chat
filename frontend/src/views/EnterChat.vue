<template>
  <div class="container d-flex align-items-center justify-content-center min-vh-100">
    <div class="card shadow p-4" style="max-width: 400px; width: 100%;">
      <h2 class="mb-4 text-center">Enter on chat</h2>
      <div>
        <div class="mb-3">
          <label for="token" class="form-label">Chat token</label>
          <input type="text" v-model="token" class="form-control" id="token" placeholder="Enter token" required>
        </div>
        <small v-if="error != ''" style="color: red;">{{ error }}</small>
        <button type="submit" @click="enter()" class="btn btn-primary w-100">Enter</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {

  data() {
    return {
      token: undefined,
      error: ''
    }
  },
  methods: {
    async enter() {
      try {
        let token_user = localStorage.getItem('token');
        await axios.post(process.env.VUE_APP_BACKEND_URL + '/chats/enter', {
          token_user: token_user,
          token_chat: this.token
        });        
        
        this.$router.push({name: 'chats'});
      } catch (error) {
        this.error = error.response.data.error;        
      }
    }
  }

}
</script>

<style>

</style>