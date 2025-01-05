import { createRouter, createWebHashHistory } from "vue-router";

import Home from "../views/Home.vue";

import ArticleDetails from "../views/article/ArticleDetails.vue";

import ArchiveList from "../views/archive/ArchiveList.vue";
import ArchiveDetails from "../views/archive/ArchiveDetails.vue";

import CategoryList from "../views/category/CategoryList.vue";
import CategoryDetails from "../views/category/CategoryDetails.vue";

import TagList from "../views/tag/TagList.vue";
import TagDetails from "../views/tag/TagDetails.vue";

import PageNotFound from "../views/PageNotFound.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/article/:id",
    name: "ArticleDetails",
    component: ArticleDetails,
    props: true,
  },
  {
    path: "/archive",
    name: "ArchiveList",
    component: ArchiveList,
  },
  {
    path: "/archive/:id",
    name: "ArchiveDetails",
    component: ArchiveDetails,
    props: true,
  },
  {
    path: "/category",
    name: "CategoryList",
    component: CategoryList,
  },
  {
    path: "/category/:id",
    name: "CategoryDetails",
    component: CategoryDetails,
    props: true,
  },
  {
    path: "/tag",
    name: "TagList",
    component: TagList,
  },
  {
    path: "/tag/:id",
    name: "TagDetails",
    component: TagDetails,
    props: true,
  },
  {
    path: "/:pathMatch(.*)*",
    component: PageNotFound,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  next();
});

export default router;
