import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Project from '../views/Project.vue'
import Grid from '../views/Grid.vue'
import Editor from '../views/Editor.vue'

import Dashboard from '../views/Dashboard.vue'
import Login from '../views/Login.vue'
import CreateUser from '../views/CreateUser.vue'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    children: [
      {
        path: '/dashboard',
        name: 'Project',
        component: Project
      },
      {
        path: '/create-user',
        name: 'CreateUser',
        component: CreateUser
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
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const publicPages = ['/']
  const authRequired = !publicPages.includes(to.path)
  if (authRequired && !localStorage.getItem('user_token')) {
    return next('/')
  } else {
    next()
  }
})

export default router
