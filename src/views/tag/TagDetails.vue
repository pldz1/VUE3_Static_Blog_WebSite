<template>
  <!-- 页头 -->
  <HeaderBar></HeaderBar>
  <div class="home">
    <div class="container">
      <!-- 侧边栏 -->
      <div class="side-content">
        <WebSiteAuthorCard></WebSiteAuthorCard>
        <SideBarArchive></SideBarArchive>
      </div>

      <!-- 界面的主题内容 -->
      <div class="post-article-list">
        <ArticleCard
          v-for="(article, index) in blogsList"
          :key="article.id"
          :article="article"
          :reverse="index % 2 == 1"
        ></ArticleCard>
      </div>
    </div>

    <!-- 页脚 -->
    <FootBar></FootBar>

    <!-- 滚动到顶部按钮 -->
    <BackToTop :cls="'home'"></BackToTop>
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import { computed, ref, onMounted } from "vue";

import { getAllBlogsData } from "../../api/get.js";

import HeaderBar from "../../components/HeaderBar.vue";
import WebSiteAuthorCard from "../../components/WebSiteAuthorCard.vue";
import SideBarArchive from "../../components/SideBarArchive.vue";
import ArticleCard from "../../components/ArticleCard.vue";
import FootBar from "../../components/FootBar.vue";
import BackToTop from "../../components/BackToTop.vue";

const props = defineProps({
  id: {
    type: String,
    default: "",
  },
});

const store = useStore();

const archives = computed(() => store.state.blogsAbout.archives);

// 存储分类列表
const blogsList = ref([]);

onMounted(() => {
  const articleList = archives.value.filter((item) =>
    item.tags.includes(props.id)
  );
  blogsList.value = articleList;
});
</script>

<style scoped>
.home {
  height: 100%;
  width: 100%;
  overflow-y: auto;
}

.container {
  padding: 40px 15px;
  max-width: 1300px;
  margin: 0 auto;
  display: flex;
  animation: fadeInUp 1s;
}

.post-article-list {
  width: 74%;
}

.post-article-card {
  margin-top: 20px;
}

.post-article-card:nth-child(1) {
  margin-top: 0;
}

.side-content {
  width: 26%;
  margin-right: 20px;
}

#pagination {
  margin-top: 20px;
  justify-content: center;
}

#pagination > button {
  box-shadow: var(--card-box-shadow);
  background: white;
  border-radius: 8px;
  height: 35px;
  width: 35px;
}

#pagination li {
  box-shadow: var(--card-box-shadow);
  background-color: white;
  border-radius: 8px;
  margin: 0 6px;
  height: 35px;
  width: 35px;
}

#pagination li.active {
  color: white;
  background: var(--theme-color);
  font-weight: normal;
}

@media screen and (max-width: 900px) {
  .side-content {
    display: none;
  }

  .home-content {
    width: 100%;
  }
}

@keyframes fadeInUp {
  from {
    margin-top: 50px;
    opacity: 0;
  }

  to {
    margin-top: 0;
    opacity: 1;
  }
}
</style>
