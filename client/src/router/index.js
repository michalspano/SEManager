import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue' // (merely for testing)
import ProgramStructureView from '@/views/ProgramStructureView.vue'
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
      component: ProgramStructureView,
      props: true, // This flag needs to be enabled to be able to pass props to a component
      meta: { requiresAuth: true },
      beforeEnter: (to, from, next) => {
        const token = localStorage.getItem('token');
        let type = 'student'; // Default value or fallback

        if (token) {
          const decoded = jwt_decode(token);
          if (decoded && decoded.type) {
            type = decoded.type;
          }
        }
        // Add the user type as a prop to the component
        // Note: params denotes props in VueRouter
        to.params.userType = type;
        next();
      },
    },
    {
      path: '/courses/:id',
      name: 'course',
      component: () => import('@/views/CourseInformationView.vue'),
      meta: { requiresAuth: true }
    }
  ]
})

// Ensure that protected routes are only accessible with a valid token
// that is, the user is logged in.
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');

  if (to.meta.requiresAuth && !token) {
    next('/login');
  } else if (to.name === 'login' && token) {
    next('/courses') // once logged in, go the CourseView
  } else next();
});

export default router