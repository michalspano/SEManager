import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue' // (merely for testing)
import jwt_decode from "jwt-decode";

// TODO: Redirect unrecognized routes to something like
// 'invalid' and make a component for that. Similar to
// 404 page not found.
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue')
    },
    {
      path: '/courses',
      name: 'courses',
      // TODO: pass the prop based on the type of the user to CourseView
      component: () => import('@/views/CourseView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/courses/:id',
      name: 'course',
      component: () => import('@/views/CourseInformationView.vue'),
      meta: { requiresAuth: true }
    },
  ]
})

// TODO: update this logic to recognize the user type too
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  let decoded;
  if (token) {
    decoded = jwt_decode(token);
  }

  // TODO: inject this as a prop to CourseView
  const userType = decoded?.type;

  // If verification is required and no token is present, go to /login
  if (to.meta.requiresAuth && !token) {
    next('/login');
  } else if (to.name === 'login' && token) {
    next('/courses') // once logged in, go the CourseView
  } else next();
});

export default router