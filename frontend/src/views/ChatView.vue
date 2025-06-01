<template>
  <div class="container">
    
    <h1>Chat room</h1>
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
          <td><router-link :to="{name: 'message',params: {chatName: chat.chat_name}, query: { chat_id: chat.id }}" >{{ chat.chat_name }}</router-link></td>
          <td> <button @click="generateToken(chat.id)" class="btn btn-success">Generate token</button> </td>
          <td> <button @click="confirmExit(chat.id)" class="btn btn-danger">Exit chat</button></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
  data() {
    return {
      chats: [],
      id: undefined
    }
  },
  created: async function () {
    let token = localStorage.getItem('token');
    try {
      let chats = await axios.post(process.env.VUE_APP_BACKEND_URL + '/chats', { token });
      this.chats = chats.data.chats;
    } catch (error) {
      this.$router.push({ name: 'login' });
    }
  },
  methods: {
    async generateToken(chat_id) {
      try {
        const res = await axios.post(process.env.VUE_APP_BACKEND_URL + '/chats/token', { id: chat_id });
        const token = res.data.token;

        await Swal.fire({
          title: 'Token generated!',
          html: `
            <p>Use this token to enter on chat:</p>
            <input type="text" value="${token}" id="tokenInput" readonly class="swal2-input">
            <button onclick="navigator.clipboard.writeText('${token}')" class="swal2-confirm swal2-styled" style="margin-top: 10px;">
              Copy token
            </button>
          `,
          showConfirmButton: false,
          showCloseButton: true,
        });

      } catch (error) {
        Swal.fire('Erro', 'Não foi possível gerar o token.', 'error');
      }
    },
    async confirmExit(chat_id) {
    const result = await Swal.fire({
      title: 'Tem certeza?',
      text: 'Você realmente deseja sair deste chat?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sim, sair',
      cancelButtonText: 'Cancelar'
    });

    if (result.isConfirmed) {
      try {
        let user_token = localStorage.getItem('token');
        await axios.post(process.env.VUE_APP_BACKEND_URL + '/chats/exit', { id: chat_id, user_token: user_token });
        Swal.fire('Removido!', 'Você saiu do chat.', 'success');
        this.chats = this.chats.filter(chat => chat.id !== chat_id);
      } catch (error) {
        Swal.fire('Erro', 'Não foi possível sair do chat.', 'error');
      }
    }
  }
  }
}

</script>

<style>

</style>