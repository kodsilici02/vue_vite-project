import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import AboutView from "../views/AboutView.vue";
import ContentsView from "../views/ContentsView.vue";
import ContentOne from "../views/Contents/ContentOne.vue";
import ContentTwo from "../views/Contents/ContentTwo.vue";
import ContentThree from "../views/Contents/ContentThree.vue";
import ContentFour from "../views/Contents/ContentFour.vue";
import DefaultCont from "../views/Contents/DefaultCont.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    component: AboutView,
  },
  {
    path: "/contents",
    name: "contents",
    component: ContentsView,
    redirect: "/contents/Default",
    children: [
      {
        path: "Default",
        name: "DefaultCont",
        component: DefaultCont,
      },
      {
        path: "/contents/ContentOne",
        name: "ContentOne",
        component: ContentOne,
      },
      {
        path: "/contents/ContentTwo",
        name: "ContentTwo",
        component: ContentTwo,
      },
      {
        path: "/contents/ContentThree",
        name: "ContentThree",
        component: ContentOne,
      },
      {
        path: "/contents/ContentFour",
        name: "ContentFour",
        component: ContentFour,
      },
    ],
  },
  //catch all 404
  //{ path: "/:catchAll(.*)", name: "NotFound", component: NotFound },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      window.scrollTo({ top: 0, left: 0 });
      setTimeout(() => {
        window.scrollTo({ top: savedPosition.top, behavior: "smooth" });
      }, 100);
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }
  },
});

export default router;
