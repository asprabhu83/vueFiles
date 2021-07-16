import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Grid from '../views/Grid.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/project',
    name: 'Grid',
    component: Grid
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
