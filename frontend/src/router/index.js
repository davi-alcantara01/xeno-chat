import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

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
    component: () => import('../views/ChatView.vue')
  },
  {
    path: '/chats/create',
    name: 'chats-create',
    component: () => import('../views/CreateChat.vue')
  },
  {
    path: '/chats/enter',
    name: 'chats-enter',
    component: () => import('../views/EnterChat.vue')
  }
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
