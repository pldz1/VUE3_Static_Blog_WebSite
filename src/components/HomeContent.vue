<template>
  <div class="home-content-container">
    <div class="container-divider">
      <span>😄 Code Playground 😄</span>
    </div>
    <!-- Code Space Playground 内容 -->
    <div class="code-space-container">
      <div class="home-card-list">
        <PlaygroundCard
          v-for="(article, index) in codePlaygroundList"
          :key="article.id"
          :article="article"
          :reverse="index % 2 == 1"
        ></PlaygroundCard>
      </div>
    </div>
    <div class="container-divider">
      <span>📖 Blogs 📖</span>
    </div>
    <!-- 博客内容 显示每个分类的serialNo.0的文章 -->
    <div class="blogs-container">
      <div class="home-card-list">
        <HomeCard
          v-for="(article, index) in blogsCategroyList"
          :key="article.id"
          :article="article"
          :reverse="index % 2 == 1"
        ></HomeCard>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";
import PlaygroundCard from "./PlaygroundCard.vue";
import HomeCard from "./HomeCard.vue";

const store = useStore();

// 获取博客分类数据的计算属性
const categories = computed(() => store.state.blogsAbout.categories);

// 当没有内容时的默认提示
const codePlaygroundList = computed(() =>
  Object.entries(store.state.websiteAbout.codespaceData).map(([id, value]) => ({
    id,
    label: id,
    ...value,
  }))
);

// 存储分类列表
const blogsCategroyList = ref([]);

onMounted(async () => {
  // 每次分类数据变化时，清空当前分类列表
  blogsCategroyList.value = [];

  for (const key in categories.value) {
    if (categories.value.hasOwnProperty(key)) {
      // 获取每个分类的第一个项目
      const serialNo0Item = categories.value[key][0];
      if (typeof serialNo0Item == "object") {
        blogsCategroyList.value.push({
          // 解构原始数据
          ...serialNo0Item,
          // 设置分类名称作为标签
          label: serialNo0Item.category,
          // 构建分类的URL路径
          url: `/category/${serialNo0Item.category}`,
        });
      }
    }
  }
});
</script>

<style scoped>
.home-content-container {
  height: 100%;
  width: 100%;
}

.code-space-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.container-divider {
  display: flex;
  align-items: center;
  text-align: center;
  margin: 20px 0;
  color: #666;
  font-size: 24px;
}

.container-divider::before,
.container-divider::after {
  content: "";
  flex: 1;
  border-top: 2px dashed #cccccc;
  margin: 0 10px;
}

.blogs-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.home-card-list {
  width: 74%;
}

.home-card-list .home-card {
  margin-top: 20px;
}

.home-card-list .home-card:nth-child(1) {
  margin-top: 0;
}
</style>
