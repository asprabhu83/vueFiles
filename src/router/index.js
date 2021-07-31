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
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard,
    children: [
      {
        path: '/',
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
  const publicPages = ['/login']
  const authRequired = !publicPages.includes(to.path)
  if (authRequired && !localStorage.getItem('user_token')) {
    return next('/login')
  } else {
    next()
  }
})

export default router
