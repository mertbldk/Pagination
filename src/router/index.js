import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect:'/Product'
  },
  {
    path: '/:pathMatch(.*)',
    redirect:'/Product'
  },
  {
    path: '/Product',
    name: 'Product',
    component: import('../views/Product.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router