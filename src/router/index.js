import { createRouter, createWebHistory } from "vue-router";
// import Home from "../views/Home.vue";

const routes = [
  {
    path: "/",
    name: "monthlyCalendar",
    component: () => import(/* webpackChunkName: "about" */ "../views/monthlyCalendar.vue"),
  },
  // {
  //   path: "/monthlyCalendar",
  //   name: "monthlyCalendar",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ "../views/monthlyCalendar.vue"),
  // },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
