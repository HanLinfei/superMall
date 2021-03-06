import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: "",
    redirect: "home"
  },
  {
    path: "/home",
    component: () => import("@/views/home/home")
  },
  {
    path: "/category",
    component: () => import("@/views/category/category")
  },
  {
    path: "/cart",
    component: () => import("@/views/cart/cart")
  },
  {
    path: "/profile",
    component: () => import("@/views/profile/profile"),
  },
  {
    // path: "/detail/:iid",
    path: "/detail",
    component: () => import("@/detail/detail")
  },
  {
    path: "/bought",
    component: () => import("@/views/profile/boughtGoods"),
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
