import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'

// TODO: make the router handle unrecognized paths
// and display an adequate error message
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/courses',
      name: 'courses',
      component: () => import('@/views/CourseView.vue')
    },
    {
      path: '/courses/:id',
      name: 'course',
      component: () => import('@/views/CourseInformationView.vue')
    }
  ]
})

export default router
