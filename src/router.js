import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store.js';

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'root',
      component: () => import('@/views/Tasks.vue'),
    },
    {
      path: '/authenticate',
      name: 'authenticate',
      component: () => import('@/views/Authenticate.vue'),
    }
  ],
})

router.beforeEach((to, from, next) => {
  let Auth = store.state.auth;

  if (to.name !== 'authenticate' && !Auth.isAuth) {
    next('/authenticate');
  }
  else if (to.name == 'authenticate' && Auth.isAuth) {
    next('/');
  }
  else {
    next();
  }
});

export default router;