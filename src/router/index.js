import { createRouter, createWebHistory } from "vue-router"
import HomePage from "../views/HomePage.vue"
import RegisterPage from "../views/RegisterPage.vue"
import AdminPage from "../views/AdminPage.vue"
import ParticipantsPage from "../views/ParticipantsPage.vue"

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomePage,
  },
  {
    path: "/register",
    name: "Register",
    component: RegisterPage,
  },
  {
    path: "/participants",
    name: "Participants",
    component: ParticipantsPage,
  },
  {
    path: "/admin",
    name: "Admin",
    component: AdminPage,
  },
  {
    path: "/payment/callback",
    name: "PaymentCallback",
    component: () => import("../views/PaymentCallback.vue"),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
