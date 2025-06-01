<template>
  <div class="container d-flex align-items-center justify-content-center min-vh-100">
    <div class="card shadow p-4" style="max-width: 400px; width: 100%;">
      <h2 class="mb-4 text-center">Chat</h2>
      <div>
        <div class="mb-3">
          <label for="chat" class="form-label">Chat Name</label>
          <input type="text" v-model="chat_name" class="form-control" id="chatt" placeholder="Enter chat name" required>
        </div>
        <div class="mb-3">
          <select id="isGroup" @change="selectGroup()" class="form-select">
            <option value="1">Group</option>
            <option value="0">Private</option>
          </select>
        </div>
        <small v-if="error != ''" style="color: red;">{{ error }}</small>
        <button type="submit" @click="create()" class="btn btn-primary w-100">Create</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      chat_name: '',
      is_group: 1,
      error: ''
    }
  },
  methods: {
    selectGroup() {
      let select = document.getElementById("isGroup");
      this.is_group = parseInt(select.value);
    },
    async create() {
      try {
        let token = localStorage.getItem('token');
        await axios.post(process.env.VUE_APP_BACKEND_URL + '/chats/create', {token: token, name: this.chat_name, is_group: this.is_group});
        this.error = '';
        this.$router.push({name: 'chats'});
      } catch (error) {
        this.error = error;
      }
    }
  }

}
</script>

<style>

</style>