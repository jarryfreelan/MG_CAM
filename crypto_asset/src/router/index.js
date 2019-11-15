import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
import axios from 'axios'
import { globalConstData } from '@/services/global'

// Containers
const DefaultContainer = () => import('@/containers/DefaultContainer')

// Views
const Dashboard = () => import('@/views/coreui/Dashboard')
const Page404 = () => import('@/views/coreui/pages/Page404')
const Page500 = () => import('@/views/coreui/pages/Page500')

//Crypto Asset
const cLogin = () => import('@/views/user/Login')
const cRegister = () => import('@/views/user/Register')
const cProfile = () => import('@/views/user/profile')
const cVerify = () => import('@/views/user/verification')

Vue.use(Router)

function configRoutes() {
  return [
    {
      path: '/',
      redirect: '/dashboard',
      name: 'Home',
      component: DefaultContainer,
      meta: {
        authRequired: true,
        hidden: true,
      },
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: Dashboard
        },
        {
          path: 'user',
          redirect: '/user/profile',
          name: 'Account',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: 'profile',
              name: 'Profile',
              component: cProfile
            },
            {
              path: 'verification',
              name: 'Verification',
              component: cVerify
            },
          ]
        },
      ]
    },
    {
      path: '/',
      redirect: '/404',
      name: 'auth',
      component: {
        render (c) { return c('router-view') }
      },
      children: [
        {
          path: 'login',
          name: 'Login',
          component: cLogin
        },
        {
          path: 'register',
          name: 'Register',
          component: cRegister
        }
      ]
    },
    { 
      path: "*",
      component: Page404 
    }
  ]
}

const router = new Router({
  mode: 'hash', // https://router.vuejs.org/api/#mode
  linkActiveClass: 'open active',
  scrollBehavior: () => ({ y: 0 }),
  routes: configRoutes()
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.authRequired)) {
    if (!store.getters.isLoggedIn) {
      next({
        path: '/login',
        query: { redirect: to.fullPath },
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
