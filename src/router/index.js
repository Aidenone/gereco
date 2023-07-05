import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/dpform/',
    name: 'DPForm',
    component: () => import('../views/DPFormView.vue')
  },
  {
    path: '/idbtest/',
    name: 'IDBTest',
    component: () => import('../views/IDBTestView.vue')
  },
  {
    path: '/vg-inter/:id',
    name: 'VGInter',
    component: () => import('../views/VGInterView.vue'),
    props: {
      default: true
    }
  },
  {
    path: '/vh/',
    name: 'vh',
    component: () => import('../views/VHView.vue')
  },
  {
    path: '/vh-inter/:id',
    name: 'VHInter',
    component: () => import('../views/VHInterView.vue'),
    props: {
      default: true
    }
  },
  {
    path: '/login/',
    name: 'Login',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/new_dp/',
    name: 'NewDP',
    component: () => import('../views/NewDPView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
