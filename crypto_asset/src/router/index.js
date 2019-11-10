import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
import axios from 'axios'
import { globalConstData } from '@/services/global'

// Containers
const DefaultContainer = () => import('@/containers/DefaultContainer')

// Views
const Dashboard = () => import('@/views/coreui/Dashboard')

const Colors = () => import('@/views/coreui/theme/Colors')
const Typography = () => import('@/views/coreui/theme/Typography')

const Charts = () => import('@/views/coreui/Charts')
const Widgets = () => import('@/views/coreui/Widgets')

// Views - Components
const Cards = () => import('@/views/coreui/base/Cards')
const Forms = () => import('@/views/coreui/base/Forms')
const Switches = () => import('@/views/coreui/base/Switches')
const Tables = () => import('@/views/coreui/base/Tables')
const Tabs = () => import('@/views/coreui/base/Tabs')
const Breadcrumbs = () => import('@/views/coreui/base/Breadcrumbs')
const Carousels = () => import('@/views/coreui/base/Carousels')
const Collapses = () => import('@/views/coreui/base/Collapses')
const Jumbotrons = () => import('@/views/coreui/base/Jumbotrons')
const ListGroups = () => import('@/views/coreui/base/ListGroups')
const Navs = () => import('@/views/coreui/base/Navs')
const Navbars = () => import('@/views/coreui/base/Navbars')
const Paginations = () => import('@/views/coreui/base/Paginations')
const Popovers = () => import('@/views/coreui/base/Popovers')
const ProgressBars = () => import('@/views/coreui/base/ProgressBars')
const Tooltips = () => import('@/views/coreui/base/Tooltips')

// Views - Buttons
const StandardButtons = () => import('@/views/coreui/buttons/StandardButtons')
const ButtonGroups = () => import('@/views/coreui/buttons/ButtonGroups')
const Dropdowns = () => import('@/views/coreui/buttons/Dropdowns')
const BrandButtons = () => import('@/views/coreui/buttons/BrandButtons')

// Views - Icons
const Flags = () => import('@/views/coreui/icons/Flags')
const FontAwesome = () => import('@/views/coreui/icons/FontAwesome')
const SimpleLineIcons = () => import('@/views/coreui/icons/SimpleLineIcons')
const CoreUIIcons = () => import('@/views/coreui/icons/CoreUIIcons')

// Views - Notifications
const Alerts = () => import('@/views/coreui/notifications/Alerts')
const Badges = () => import('@/views/coreui/notifications/Badges')
const Modals = () => import('@/views/coreui/notifications/Modals')

// Views - Pages
const Page404 = () => import('@/views/coreui/pages/Page404')
const Page500 = () => import('@/views/coreui/pages/Page500')
const Login = () => import('@/views/coreui/pages/Login')
const Register = () => import('@/views/coreui/pages/Register')

// Users
const Users = () => import('@/views/coreui/users/Users')
const User = () => import('@/views/coreui/users/User')

//Crypto Asset
const cLogin = () => import('@/views/user/Login')
const cRegister = () => import('@/views/user/Register')

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
          path: 'theme',
          redirect: '/theme/colors',
          name: 'Theme',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: 'colors',
              name: 'Colors',
              component: Colors
            },
            {
              path: 'typography',
              name: 'Typography',
              component: Typography
            }
          ]
        },
        {
          path: 'charts',
          name: 'Charts',
          component: Charts
        },
        {
          path: 'widgets',
          name: 'Widgets',
          component: Widgets
        },
        {
          path: 'users',
          meta: { label: 'Users'},
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: '',
              component: Users,
            },
            {
              path: ':id',
              meta: { label: 'User Details'},
              name: 'User',
              component: User,
            },
          ]
        },
        {
          path: 'base',
          redirect: '/base/cards',
          name: 'Base',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: 'cards',
              name: 'Cards',
              component: Cards
            },
            {
              path: 'forms',
              name: 'Forms',
              component: Forms
            },
            {
              path: 'switches',
              name: 'Switches',
              component: Switches
            },
            {
              path: 'tables',
              name: 'Tables',
              component: Tables
            },
            {
              path: 'tabs',
              name: 'Tabs',
              component: Tabs
            },
            {
              path: 'breadcrumbs',
              name: 'Breadcrumbs',
              component: Breadcrumbs
            },
            {
              path: 'carousels',
              name: 'Carousels',
              component: Carousels
            },
            {
              path: 'collapses',
              name: 'Collapses',
              component: Collapses
            },
            {
              path: 'jumbotrons',
              name: 'Jumbotrons',
              component: Jumbotrons
            },
            {
              path: 'list-groups',
              name: 'List Groups',
              component: ListGroups
            },
            {
              path: 'navs',
              name: 'Navs',
              component: Navs
            },
            {
              path: 'navbars',
              name: 'Navbars',
              component: Navbars
            },
            {
              path: 'paginations',
              name: 'Paginations',
              component: Paginations
            },
            {
              path: 'popovers',
              name: 'Popovers',
              component: Popovers
            },
            {
              path: 'progress-bars',
              name: 'Progress Bars',
              component: ProgressBars
            },
            {
              path: 'tooltips',
              name: 'Tooltips',
              component: Tooltips
            }
          ]
        },
        {
          path: 'buttons',
          redirect: '/buttons/standard-buttons',
          name: 'Buttons',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: 'standard-buttons',
              name: 'Standard Buttons',
              component: StandardButtons
            },
            {
              path: 'button-groups',
              name: 'Button Groups',
              component: ButtonGroups
            },
            {
              path: 'dropdowns',
              name: 'Dropdowns',
              component: Dropdowns
            },
            {
              path: 'brand-buttons',
              name: 'Brand Buttons',
              component: BrandButtons
            }
          ]
        },
        {
          path: 'icons',
          redirect: '/icons/font-awesome',
          name: 'Icons',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: 'coreui-icons',
              name: 'CoreUI Icons',
              component: CoreUIIcons
            },
            {
              path: 'flags',
              name: 'Flags',
              component: Flags
            },
            {
              path: 'font-awesome',
              name: 'Font Awesome',
              component: FontAwesome
            },
            {
              path: 'simple-line-icons',
              name: 'Simple Line Icons',
              component: SimpleLineIcons
            }
          ]
        },
        {
          path: 'notifications',
          redirect: '/notifications/alerts',
          name: 'Notifications',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: 'alerts',
              name: 'Alerts',
              component: Alerts
            },
            {
              path: 'badges',
              name: 'Badges',
              component: Badges
            },
            {
              path: 'modals',
              name: 'Modals',
              component: Modals
            }
          ]
        }
      ]
    },
    {
      path: '/pages',
      redirect: '/pages/404',
      name: 'Pages',
      component: {
        render (c) { return c('router-view') }
      },
      children: [
        {
          path: '404',
          name: 'Page404',
          component: Page404
        },
        {
          path: '500',
          name: 'Page500',
          component: Page500
        },
        {
          path: 'dlogin',
          name: 'dLogin',
          component: Login
        },
        {
          path: 'dregister',
          name: 'dRegister',
          component: Register
        }
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
