import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RoutesView from '../views/Routes.vue'
import WeatherView from '../views/WeatherView.vue'
import ChecklistView from '../views/ChecklistView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/routes',
      name: 'routes',
      component: RoutesView
    },
    {
      path: '/weather',
      name: 'weather',
      component: WeatherView
    },
    {
      path: '/checklist',
      name: 'checklist',
      component: ChecklistView
    }
  ]
})

export default router
