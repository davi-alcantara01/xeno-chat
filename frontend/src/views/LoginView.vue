<template>
  <div class="container d-flex align-items-center justify-content-center min-vh-100">
    <div class="card shadow p-4" style="max-width: 400px; width: 100%;">
      <h2 class="mb-4 text-center">Login</h2>
      <div>
        <div class="mb-3">
          <label for="email" class="form-label">Email address</label>
          <input type="email" v-model="email" class="form-control" id="email" placeholder="Enter email" required>
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Password</label>
          <input type="password" v-model="password" class="form-control" id="password" placeholder="Password" required>
        </div>
        <small v-if="error != ''" style="color: red;">{{ error }}</small>
        <button type="submit" @click="submit()" class="btn btn-primary w-100">Login</button>
      </div>
    </div>
  </div>
</template>

<script>

import axios from 'axios';

export default {
  data() {
    return {
      email: '',
      password: '',
      error: ''
    }
  },

  methods: {
    async submit() {
      this.error = '';
      try {        
        let result = await axios.post(process.env.VUE_APP_BACKEND_URL + '/user/login', {
        email: this.email,
        password: this.password
      })
      localStorage.setItem('token', result.data.token);
      this.$router.push({name: 'chats'})
      } catch (error) {
        this.error = error.response.data.error;
      }
      
    }
  }

}


</script>

<style scoped>
.card {
  border-radius: 1rem;
}
</style>