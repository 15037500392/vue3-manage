import { createRouter, createWebHistory } from "vue-router";

import Home from "@/pages/index.vue";
import NotFound from "@/pages/404.vue";
import Login from "@/pages/Login/index.vue";
import Admin from "@/layouts/admin.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Admin,
      children:[{
        path: "/",
        name: "home",
        component: Home,
        meta: {
          title: "后台首页",
        },
      }]
    },
    {
      path: "/login",
      name: "Login",
      component: Login,
      meta: {
        title: "登录页",
      },
    },
    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      component: NotFound,
      meta: {
        title: "404",
      },
    },
  ],
});

export default router;
