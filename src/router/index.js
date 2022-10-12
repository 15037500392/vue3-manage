import { createRouter, createWebHistory } from "vue-router";

import Home from "@/pages/index.vue";
import NotFound from "@/pages/404.vue";
import Login from "@/pages/Login/index.vue";
import Admin from "@/layouts/admin.vue";
import GoodList from "@/pages/GoodList/index.vue";
import CategoryList from "@/pages/CategoryList/index.vue";
const routes = [
  {
    path: "/",
    name: "admin",
    component: Admin,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
    meta:{
      title:"登录页"
    }
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFound,
  },
];

// 动态路由
const asyncRouter = [
  {
    path: "/",
    name: "/",
    component: Home,
    meta: {
      title: "后台首页",
    },
  },
  {
    path: "/goods/list",
    name: "/goods/list",
    component: GoodList,
    meta: {
      title: "商品管理",
    },
  },
  {
    path: "/category/list",
    name: "/category/list",
    component: CategoryList,
    meta: {
      title: "分类列表",
    },
  },
];
export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
});

//动态添加路由的方法
export function addRoutes(menus) {
  //  是否有新的路由
  let hasNewRoute = false
  const findAndRoutesByMenus = (arr) => {
    arr.forEach((e) => {
      let item = asyncRouter.find((o) => {
        return o.path == e.frontpath
      });
      console.log(item,'item')
      if (item && !router.hasRoute(item.path)) {
        hasNewRoute = true
        router.addRoute("admin",item)
      }
      if(e.child && e.child.length > 0){
        findAndRoutesByMenus(e.child)
      }
    });
  };

  findAndRoutesByMenus(menus)
  return hasNewRoute
}
