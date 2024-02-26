import { createRouter, createWebHistory } from 'vue-router';
import EventList from '../views/EventList.vue';
import AdminPanel from '../views/AdminPanel.vue';

const routes = [
  { 
    path: '/',
    name: 'EventList',
    component: EventList 
  },
  { 
    path: '/admin',
    name: 'AdminPanel',
    component: AdminPanel 
  },
  // ... add other routes here
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;