import "./assets/css/index.css";
import "element-plus/es/components/message/style/css";
import "element-plus/es/components/message-box/style/css";

import { createApp } from "vue";
import { getAllBlogsData } from "./api/get.js";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import FontAwesomeIcon from "./utils/fontawesome-icons";

const app = createApp(App);

// 异步初始化函数
const initializeApp = async () => {
  const data = await getAllBlogsData();
  await store.dispatch("blogsAbout/update", data);
  if (!data) {
    alert("在项目当中没有博客文件, 只能预览网站大致样子.");
  }
};

initializeApp().then(() => {
  app
    .use(store)
    .use(router)
    .component("font-awesome-icon", FontAwesomeIcon)
    .mount("#app");
});
