import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Registro from "../views/Registro.vue";
import servicios from "../views/servicios.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/Registro",
    name: "Registro",
    component: Registro,
  },
  {
    path: "/servicios",
    name: "servicios",
    component: servicios,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
