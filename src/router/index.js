import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import AboutView from "../views/AboutView.vue";
import NotFound from "../views/NotFound.vue";
import ContentsView from "../views/ContentsView.vue";
import ContentOne from "../views/Contents/ContentOne.vue";
import ContentTwo from "../views/Contents/ContentTwo.vue";
import ContentFour from "../views/Contents/ContentFour.vue";
import DefaultCont from "../views/Contents/DefaultCont.vue";
import FormView from "../views/FormView.vue";
import UploadCont from "../views/UploadCont.vue";
import BlogView from "../views/BlogView.vue";
import BlogDetail from "../views/BlogDetail.vue";

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
    path: "/form",
    name: "form",
    component: FormView,
  },
  {
    path: "/upload",
    name: "upload",
    component: UploadCont,
  },
  {
    path: "/contents",
    name: "contents",
    component: BlogView,
  },
  {
    path: "/contents/:title",
    name: "blogDetail",
    component: BlogDetail,
    props: (route) => ({ id: route.query.id }),
  },
  /*
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
  },*/
  //catch all 404
  { path: "/:catchAll(.*)", name: "NotFound", component: NotFound },
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
    } /*else {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      setTimeout(() => {
        window.scrollTo({ top: 1290, left: 0, behavior: "smooth" });
      }, 500);
    }*/
  },
});

export default router;
