import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import axios from 'axios';


async function middleware(to, from, next) {
  let token = localStorage.getItem('token');

  try {
    await axios.post('http://localhost:3000/user/verify', {token: token});
    next();
  } catch (error) {
    next('/login');
  }
  
}

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/RegisterView.vue')
  },
  {
    path: '/chats',
    name: 'chats',
    beforeEnter: middleware,
    component: () => import('../views/ChatView.vue'),
  },
  {
    path: '/chats/create',
    name: 'chats-create',
    beforeEnter: middleware,
    component: () => import('../views/CreateChat.vue')
  },
  {
    path: '/chats/enter',
    name: 'chats-enter',
    beforeEnter: middleware,
    component: () => import('../views/EnterChat.vue')
  },
  {
    path: '/chats/:chatName',
    name: 'message',
    beforeEnter: middleware,
    component: () => import('../views/MsgView.vue'),
    props: true
  }
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
