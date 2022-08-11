import { createRouter, createWebHistory } from "vue-router";
import LoginForm from "./components/Login.vue";

const routeInfos = [{ path: "/login", component: LoginForm }];

const router = createRouter({
  history: createWebHistory(),
  routes: routeInfos,
});

export default router;
// export default Router({
//   routes: [{ path: "/login", component: LoginForm }],
// });
