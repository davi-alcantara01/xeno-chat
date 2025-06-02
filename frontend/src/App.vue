<template>
  <div>
    <NavbarOff v-if="!logged" />
    <NavbarOn v-else />
    <router-view/>
  </div>
</template>

<script>
import NavbarOff from '@/components/NavbarOff.vue'
import NavbarOn from '@/components/NavbarOn.vue'
import axios from 'axios'


export default {

  components: {
    NavbarOff,
    NavbarOn
  },
  data() {
    return {
      logged: false
    }
  },
  created: async function () {
    let token = localStorage.getItem('token')
    try {
      await axios.post(process.env.VUE_APP_BACKEND_URL + "/user/verify", {token: token});
      this.logged = true
    } catch (error) {
      this.logged = false;
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
