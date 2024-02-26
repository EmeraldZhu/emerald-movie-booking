import { createRouter, createWebHistory } from 'vue-router';
import EventList from '../views/EventList.vue';
import AdminPanel from '../views/AdminPanel.vue';

const routes = [
  { path: '/', component: EventList },
  { path: '/admin', component: AdminPanel },
  // ... add other routes here
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;