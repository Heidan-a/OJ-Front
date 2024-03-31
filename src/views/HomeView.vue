<template>
  <div class="home">
    <MdEditor :value="mdValue" :hand-change="mdOnChange" />
    <code-editor :value="codeValue" :hand-change="codeOnChange" />
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import MdEditor from "@/components/MdEditor.vue";
import CodeEditor from "@/components/CodeEditor.vue";

const mdValue = ref();
const codeValue = ref();
const mdOnChange = (v: string) => {
  mdValue.value = v;
};
const codeOnChange = (v: string) => {
  codeValue.value = v;
};
</script>
