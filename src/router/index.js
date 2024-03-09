import { createRouter, createWebHistory } from "vue-router";

// Routes
import Login from '@/pages/Login.vue'
import MessageSender from '@/pages/MessageSender.vue';

const routes = [
  {
    path: "/",
    component: Login,
  },
  {
    path: "/message-sender",
    component: MessageSender,
  },
];

export const router = createRouter({
    history: createWebHistory(),
    routes,
});