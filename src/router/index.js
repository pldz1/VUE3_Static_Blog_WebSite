import { createRouter, createWebHistory } from "vue-router";

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
    path: "/404",
    name: "NotFoundPage",
    component: PageNotFound,
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/404",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 显示蒙层函数
function showGlobalLoading() {
  const loadingEl = document.getElementById("global-initial-loading");
  if (loadingEl) {
    // 如果之前是隐藏的，就显示它
    loadingEl.style.display = "flex";
  }
  // 把进度条重置为 0%
  if (window.updateProgress) {
    window.fakeProgress = 0;
    window.updateProgress(window.fakeProgress);
  }
}

// 隐藏蒙层函数
function hideGlobalLoading() {
  const loadingEl = document.getElementById("global-initial-loading");
  if (loadingEl) {
    loadingEl.style.display = "none";
  }
  // 同时重置进度，防止下次还残留
  if (window.updateProgress) {
    window.fakeProgress = 0;
    window.updateProgress(window.fakeProgress);
  }
}

// ===== 路由切换进度条逻辑 =====
router.beforeEach((to, from, next) => {
  console.log("[DEBUG] from =", from.fullPath, "to =", to.fullPath);
  // 如果目标地址 == 当前地址，就不再重复显示进度条
  if (to.fullPath === from.fullPath) {
    return next();
  }
  // 1. 显示全屏蒙层
  showGlobalLoading();
  // 2. 这时可以先让进度到 30% 或其它值
  if (window.updateProgress) {
    window.fakeProgress = 30;
    window.updateProgress(window.fakeProgress);
  }
  next();
});

router.afterEach(() => {
  // 路由加载完后，先把进度条推到 100%
  if (window.updateProgress) {
    window.fakeProgress = 100;
    window.updateProgress(window.fakeProgress);
  }
  // 再稍微延迟隐藏蒙层
  setTimeout(() => {
    hideGlobalLoading();
  }, 300);
});

export default router;
