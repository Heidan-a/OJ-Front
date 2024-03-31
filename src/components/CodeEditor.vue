<template>
  <div id="code-editor" ref="codeEditorRef" style="min-height: 400px" />
  <a-button @click="fillValue">填充值</a-button>
</template>

<script setup lang="ts">
import * as monaco from "monaco-editor";
import { defineProps, onMounted, ref, toRaw, withDefaults } from "vue";

const codeEditorRef = ref();
const codeEditor = ref();
const value = ref("hello world");

/**
 * 定义属性
 */
interface Props {
  value: string,
  handChange: (v) => void
}

/**
 * 给变量赋值
 */
const props = withDefaults(defineProps<Props>(), {
  value: () => "",
  handChange: (v: string) => {
    console.log(v);
  },
});
const fillValue = () => {
  if (!codeEditor.value) {
    return;
  }
  toRaw(codeEditor.value).setValue("new");
};
onMounted(() => {
  if (!codeEditorRef.value) return;
  codeEditor.value = monaco.editor.create(codeEditorRef.value, {
    language: "java",
    automaticLayout: true,
    value: value.value,
    minimap: {
      enabled: true,
    },
    readOnly: false,
    theme: "vs-dark",
    // lineNumbers: "off",
    // roundedSelection: false,
    // scrollBeyondLastLine: false,
  });

  codeEditor.value.onDidChangeModelContent(() => {
    props.handChange(toRaw(codeEditor.value).getValue())
  });
});
</script>

<style scoped></style>
