import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Project from '../views/Project.vue'
import Grid from '../views/Grid.vue'
import Editor from '../views/Editor.vue'

const routes = [
  {
    path: '/',
    name: 'Project',
    component: Project
  },
  {
    path: '/upload',
    name: 'Home',
    component: Home
  },
  {
    path: '/project',
    name: 'Grid',
    component: Grid
  },
  {
    path: '/editor',
    name: 'Editor',
    component: Editor
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
