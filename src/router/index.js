import Vue from "vue";
import Router from "vue-router";

import AboutPage from "@/views/AboutPage.vue";
import HomePage from "@/views/HomePage.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "HomePage",
      component: HomePage,
    },
    {
      path: "/about",
      name: "AboutPage",
      component: AboutPage,
    },
  ],
});
