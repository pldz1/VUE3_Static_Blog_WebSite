import "./assets/css/index.css";
import "element-plus/es/components/message/style/css";
import "element-plus/es/components/message-box/style/css";

import { createApp } from "vue";
import { getAllBlogsData, getAPIData } from "./api/get.js";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import FontAwesomeIcon from "./utils/fontawesome-icons";

const app = createApp(App);

// 异步初始化函数
const initializeApp = async () => {
  const blogsData = await getAllBlogsData();
  await store.dispatch("blogsAbout/update", blogsData);
  if (!blogsData) {
    alert("在项目当中没有博客文件, 只能预览网站大致样子.");
  }
  // 获取隐私数据
  const privacyData = await getAPIData("privacy.json");
  await store.dispatch("websiteAbout/setPrivacyData", privacyData);

  // 获得codespace数据
  const codespaceData = await getAPIData("codespace.json");
  await store.dispatch("websiteAbout/setCodeSpaceData", codespaceData);
};

initializeApp().then(() => {
  app
    .use(store)
    .use(router)
    .component("font-awesome-icon", FontAwesomeIcon)
    .mount("#app");
});
