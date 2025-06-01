<template>
  <div class="chat-system">
    <h1>Xeno Chat</h1>
    <div class="chat-container">
      <div class="messages">
        <div v-for="(msg, index) in messages" :key="index" class="message">
          <strong>{{ msg.user }}:</strong> {{ msg.text }}
        </div>
      </div>
      <form @submit.prevent="sendMessage" class="input-form">
        <input
          v-model="newMessage"
          type="text"
          placeholder="Type your message..."
          required
        />
        <button type="submit">Send</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const messages = ref([
  { user: 'Alice', text: 'Hello! Welcome to Xeno Chat.' },
  { user: 'Bob', text: 'Hi Alice! How are you?' }
])

const newMessage = ref('')

function sendMessage() {
  if (newMessage.value.trim() !== '') {
    messages.value.push({ user: 'You', text: newMessage.value })
    newMessage.value = ''
  }
}
</script>

<style scoped>
.chat-system {
  max-width: 500px;
  margin: 40px auto;
  padding: 24px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: #fafafa;
}
.chat-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.messages {
  min-height: 200px;
  max-height: 300px;
  overflow-y: auto;
  background: #fff;
  border: 1px solid #eee;
  border-radius: 4px;
  padding: 12px;
}
.message {
  margin-bottom: 8px;
}
.input-form {
  display: flex;
  gap: 8px;
}
input[type="text"] {
  flex: 1;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
}
button {
  padding: 8px 16px;
  border: none;
  background: #1976d2;
  color: #fff;
  border-radius: 4px;
  cursor: pointer;
}
button:hover {
  background: #1565c0;
}
</style>