<template>
  <div id="app">
    <BasicLayout />
  </div>
</template>

<style>
#app {
}
</style>
<script setup lang="ts">
import BasicLayout from "@/layouts/BasicLayout.vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { onMounted } from "vue";

const router = useRouter();
const store = useStore();
/**
 *  全局初始化函数，单次调用的代码写在这
 */
const doInit = () => {
  console.log("欢迎来到OJ");
};

onMounted(() => {
  doInit();
});

router.beforeEach((to, from, next) => {
  if (to.meta?.access === "canAdmin") {
    if (store.state.user.loginUser?.role !== "admin") {
      next("noAuth");
      return;
    }
  }
  next();
});
</script>
