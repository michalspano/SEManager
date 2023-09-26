import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/test',
      name: 'test',
      // Loading the component lazily
      component: () => import('@/views/TestView.vue')
    },
    {
      path: '/courses',
      name: 'courses',
      component: () => import('@/views/CourseView.vue')
    }
  ]
})

export default router
