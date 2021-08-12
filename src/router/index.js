import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Project from '../views/Project.vue'
import Grid from '../views/Grid.vue'
import Editor from '../views/Editor.vue'

import Dashboard from '../views/Dashboard.vue'
import Login from '../views/Login.vue'
import UsersList from '../views/UserList.vue'
import UserRoleList from '../views/UserRoleList.vue'
import Profile from '../views/Profile.vue'

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
        path: '/project',
        name: 'Project',
        component: Project
      },
      {
        path: '/',
        name: 'Profile',
        component: Profile
      },
      {
        path: '/user-list',
        name: 'UsersList',
        component: UsersList
      },
      {
        path: '/user-role-list',
        name: 'UserRoleList',
        component: UserRoleList
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
  routes,
  linkActiveClass: 'active',
  linkExactActiveClass: 'exact-active'
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
