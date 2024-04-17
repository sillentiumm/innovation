import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main',
      component: () => import('../pages/Main.vue')
    },
    {
      path: '/details',
      name: 'details',
      component: () => import('../pages/Details.vue')
    },
  ]
})

export default router
