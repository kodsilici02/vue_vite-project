import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import AboutView from "../views/AboutView.vue";
import NotFound from "../views/NotFound.vue";
import UploadCont from "../views/UploadCont.vue";
import BlogView from "../views/BlogView.vue";
import BlogDetail from "../views/BlogDetail.vue";
import DefaultView from "../views/BlogView/DefaultView.vue";
import TagFilter from "../views/BlogView/TagFilter.vue";

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
    path: "/upload",
    name: "upload",
    component: UploadCont,
  },
  {
    path: "/articles",
    name: "articles",
    component: BlogView,
    redirect: "/articles/Default",
    children: [
      {
        path: "Default",
        name: "DefaultView",
        component: DefaultView,
      },
      {
        path: "tags/:tag",
        name: "tagFilter",
        component: TagFilter,
        props: (route) => ({ tag: route.params.tag }),
        props: true,
      },
    ],
  },
  {
    path: "/contents/:title",
    name: "blogDetail",
    component: BlogDetail,
    props: (route) => ({ id: route.query.id }),
  },

  /*{
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
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }
  },
});

export default router;
