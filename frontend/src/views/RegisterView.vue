<template>
  <div class="container d-flex align-items-center justify-content-center min-vh-100">
    <div class="card shadow p-4" style="max-width: 400px; width: 100%;">
      <h2 class="mb-4 text-center">Register</h2>
      <div>
        <div class="mb-3">
          <label for="email" class="form-label">Email address</label>
          <input type="email" v-model="email" class="form-control" id="email" placeholder="Enter email" required>
        </div>
        <div class="mb-3">
          <label class="form-label">Username</label>
          <input type="text" v-model="username" class="form-control" id="username" placeholder="Enter username" required>
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Password</label>
          <input type="password" v-model="password" class="form-control" id="password" placeholder="Password" required>
        </div>
        <button type="submit" @click="register()" class="btn btn-primary w-100">Login</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      email: '',
      username: '',
      password: ''
    }
  },
  methods: {
    async register() {
      try {
        await axios.post(process.env.VUE_APP_BACKEND_URL + '/user/create', {
          email: this.email,
          username: this.username,
          password: this.password
        });
        this.$router.push({name: 'login'});
      } catch (error) {
        alert('Erro! Tente novamente');
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