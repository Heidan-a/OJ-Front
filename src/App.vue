<template>
  <div id="app">
    <template v-if="route.path.startsWith('/user')">
      <router-view />
    </template>
    <template v-else>
      <BasicLayout />
    </template>
  </div>
</template>

<style>
#app {
}
</style>
<script setup lang="ts">
import BasicLayout from "@/layouts/BasicLayout.vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import { onMounted } from "vue";
import UserLayout from "@/layouts/UserLayout.vue";

const route = useRoute();
/**
 *  全局初始化函数，单次调用的代码写在这
 */
const doInit = () => {
  console.log("欢迎来到OJ");
};

onMounted(() => {
  doInit();
});
</script>
