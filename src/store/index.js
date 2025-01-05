import { createStore } from "vuex";

// 网站
const websiteAbout = {
  namespaced: true,
  state: {
    websiteName: process.env.VUE_APP_WEBSITE_NAME,
    startDate: process.env.VUE_APP_WEB_START_TIME,
    websiteAuthorInfo: {
      name: process.env.VUE_APP_WEBSITE_NAME,
      signature: "",
      avatar: "./avatar.png",
      githubUrl: process.env.VUE_APP_WEBSITE_AUTHOR_GITHUB,
      csdnUrl: process.env.VUE_APP_WEBSITE_AUTHOR_CSDN,
      juejinUrl: process.env.VUE_APP_WEBSITE_AUTHOR_JUEJIN,
    },
  },
  actions: {},
  mutations: {},
};

// 博客信息
const blogsAbout = {
  namespaced: true,
  state: {
    archives: [],
    categories: {},
    tags: [],
  },
  actions: {
    // 通过 dispatch 调用这个 action，来提交 mutation
    update({ commit }, data) {
      commit("setAllBlogsData", data);
    },
  },
  mutations: {
    // mutation 来更新 allBlogsData
    setAllBlogsData(state, data) {
      if (data) {
        state.archives = data?.archives || [];
        state.categories = data?.categories || {};
        state.tags = data?.tags || [];
      }
    },
  },
};

// 管理员
let adminAbout = {
  namespaced: true,
  state: {
    adminInfo: {
      nickName: "",
      signature: "",
      avatar: "/avatar.png",
      githubUrl: "",
    },
    articleCountInfo: {
      article: 0,
      category: 0,
      tag: 0,
    },
    isAdmin: false,
  },
  actions: {},
  mutations: {},
};

// 分类
let categoryAbout = {
  namespaced: true,
  state: {
    categoryCounts: [],
  },
  actions: {},
  mutations: {
    updateCategoryCounts(state, data) {
      state.categoryCounts = data;
    },
  },
};

// 标签
let tagAbout = {
  namespaced: true,
  state: {
    tagCounts: [],
  },
  actions: {},
  mutations: {
    updateTagCounts(state, data) {
      state.tagCounts = data;
    },
  },
};

export default createStore({
  modules: { adminAbout, websiteAbout, blogsAbout, categoryAbout, tagAbout },
});
