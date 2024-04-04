<template>
  <div class="details">
    <Editor
      class="editos"
      :locale="zhHans"
      :plugins="plugins"
      :value="value"
      :mode="mode"
      @change="handChange"
    />
  </div>
</template>

<script setup lang="ts">
import "bytemd/dist/index.css"; // 导入编辑器样式
import { Editor } from "@bytemd/vue-next"; // 导入编辑器组件
import zhHans from "bytemd/lib/locales/zh_Hans.json"; // 汉化
import "highlight.js/styles/vs.css";
import "juejin-markdown-themes/dist/juejin.min.css";

import { ref, defineProps, withDefaults } from "vue";
import gfm from "@bytemd/plugin-gfm";
import highlight from "@bytemd/plugin-highlight";

const plugins = [gfm(), highlight()];

interface Props {
  value: string;
  mode?: string;
  handChange: (v: string) => void;
}

const props = withDefaults(defineProps<Props>(), {
  value: () => "",
  mode: () => "split",
  handChange: (v: string) => {
  },
});
</script>
<style lang="scss">
.bytemd-toolbar-icon.bytemd-tippy.bytemd-tippy-right:last-child {
  display: none;
}
//.details {
//  position: fixed;
//  top: 60px;
//  left: 0;
//  width: 100vw;
//  height: 100vh;
//
//  .editos {
//    .bytemd {
//      height: calc(
//        100vh - 150px
//      ) !important; // 改变编辑器默认高度，不需要的可以不配置
//    }
//  }
//
//  .viewer {
//    margin-top: 20px;
//    background: #fff;
//    padding: 20px;
//
//    .bytemd {
//      height: calc(100vh - 200px) !important;
//    }
//  }
//
//  .btn {
//    flex-direction: row-reverse;
//    margin: 20px;
//
//    .el-button {
//      margin-right: 20px;
//    }
//  }
//}
</style>
