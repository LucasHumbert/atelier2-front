import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import EventView from "@/views/EventView";
import SignupView from "@/views/SignupView";
import SigninView from "@/views/SigninView";
import EventCreationView from "@/views/EventCreationView";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/profil',
    name: 'profil',
    component: () => import('../views/profil/profil')
  },
  {
    path: '/profil_events',
    name: 'profil_events',
    component: () => import('../views/profil/events')
  },
  {
    path: '/profil_eventsCreated',
    name: 'profil_eventsCreated',
    component: () => import('../views/profil/eventsCreated')
  },
  {
    path: '/event/:id',
    name: 'event',
    component: EventView
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignupView
  },
  {
    path: '/signin',
    name: 'signin',
    component: SigninView
  },
  {
    path: '/create/event',
    name: 'createevent',
    component: EventCreationView
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
