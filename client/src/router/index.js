import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import PageNotFound from '@/views/PageNotFound.vue'
import ProgramStructureView from '@/views/ProgramStructureView.vue'
import jwt_decode from "jwt-decode";

/**
 * The definition of the routes of the application.
 */
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
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('@/views/AdminView.vue'),
      meta: { requiresAuth: true, isAdmin: true }
    },
    {
      // if an unrecognized route is passed, default to here:
      path: '/:catchAll(.*)',
      component: PageNotFound
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
    // Once logged in, go to the courses page
    next('/courses')
  } else if (to.meta.isAdmin && token) {
    const decoded = jwt_decode(token);
    if (decoded && decoded.type && decoded.type === 'admin') {
      next();
    } else {
      // If the user is not an admin, redirect to the courses page
      next('/courses');
    }
  } else next();
});

export default router