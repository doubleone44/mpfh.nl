import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/synth',
    name: 'synth',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/Synth.vue')
  },
  {
    path: '/wallpaper',
    name: 'wallpaper',
    component: () => import('../views/Wallpaper.vue')
  }

]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
