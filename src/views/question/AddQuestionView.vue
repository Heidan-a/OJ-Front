<script setup lang="ts">
import MdEditor from "@/components/MdEditor.vue";
import { onMounted, reactive, ref } from "vue";
import { QuestionControllerService } from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import { useRoute } from "vue-router";

const route = useRoute();
const updatePage = route.path.includes("update");
const formRef = ref()
let form = ref({
  title: "",
  tags: [],
  answer: "",
  content: "",
  judgeConfig: {
    timeLimit: 1000,
    memoryLimit: 1000,
    stackLimit: 1000,
  },
  judgeCase: [
    {
      input: "",
      output: "",
    },
  ],
});


const loadData = async () => {
  const id = route.query.id;
  if (!id) {
    return;
  }
  const res = await QuestionControllerService.getQuestionByIdUsingGet(
    id as any
  );
  if (res.code === 0) {
    form.value = res.data as any;
    if(form.value.judgeCase){
      form.value.judgeCase = [
        {
          input: "",
          output: "",
        },
      ]
    }
    else {
      form.value.judgeCase = JSON.parse(form.value.judgeCase as any)
    }
    if(!form.value.judgeConfig){
      form.value.judgeConfig = {
        timeLimit: 1000,
        memoryLimit: 1000,
        stackLimit: 1000,
      }
    }else {
      form.value.judgeConfig = JSON.parse(form.value.judgeConfig as any)
    }
    if(!form.value.tags){
      form.value.tags = []
    }else {
      form.value.tags = JSON.parse(form.value.tags as any)
    }
  } else {
    message.error("加载失败：");
  }
};

onMounted(() => {
  loadData();
});
const removeCase = (index: number) => {
  if (index !== -1) {
    form.value.judgeCase.splice(index, 1);
  }
};
const addCase = () => {
  form.value.judgeCase.push({
    input: "",
    output: "",
  });
};
const doSubmit = async () => {
  if(updatePage){
    const res = await QuestionControllerService.updateQuestionUsingPost(form.value);
    if (res.code === 0) {
      message.success("更新成功");
    } else {
      message.warning("更新失败:" + res.message);
    }
  }
 else{
    const res = await QuestionControllerService.addQuestionUsingPost(form.value);
    if (res.code === 0) {
      message.success("添加成功");
    } else {
      message.warning("添加失败:" + res.message);
    }
  }
};
const contentOnChange = (v: string) => {
  form.value.content = v;
};
const answerOnchange = (v: string) => {
  form.value.answer = v;
};
</script>

<template>
  <div id="addQuestionView">
    <h2>创建题目</h2>
    <a-form :model="form" label-align="right" :ref="formRef">
      <a-form-item label="标题" field="title">
        <a-input v-model="form.title" placeholder="请输入题目标题" />
      </a-form-item>
      <a-form-item label="标签">
        <a-input-tag
          v-model="form.tags"
          allow-clear
          placeholder="选择题目分类"
        />
      </a-form-item>
      <a-form-item label="题解" field="answer">
        <MdEditor :value="form.answer" :hand-change="answerOnchange" />
      </a-form-item>
      <a-form-item label="内容" field="content">
        <MdEditor :value="form.content" :hand-change="contentOnChange" />
      </a-form-item>
      <a-form-item label="判题配置" :content-flex="false" :merge-props="false">
        <a-space direction="vertical" fill>
          <a-form-item field="judgeConfig.timeLimit" label="时间限制">
            <a-input-number
              v-model="form.judgeConfig.timeLimit"
              placeholder="时间限制"
              mode="button"
              size="large"
              style="max-width: 400px"
            ></a-input-number>
          </a-form-item>
          <a-form-item field="judgeConfig.memoryLimit" label="内存限制">
            <a-input-number
              v-model="form.judgeConfig.memoryLimit"
              placeholder="内存限制"
              mode="button"
              size="large"
              style="max-width: 400px"
            ></a-input-number>
          </a-form-item>
          <a-form-item field="judgeConfig.stackLimit" label="栈限制">
            <a-input-number
              v-model="form.judgeConfig.stackLimit"
              placeholder="栈限制"
              mode="button"
              size="large"
              style="max-width: 400px"
            ></a-input-number>
          </a-form-item>
        </a-space>
      </a-form-item>
      <a-form-item
        label="测试用例配置"
        :content-flex="false"
        :merge-props="false"
      >
        <a-form-item v-for="(item, idx) of form.judgeCase" :key="idx" no-style>
          <a-space style="min-width: 640px" direction="vertical">
            <a-form-item
              :field="`form.judgeCase[${idx}].input`"
              :label="`输入用例${idx}`"
              :key="idx"
            >
              <a-input v-model="item.input" placeholder="请输入输入用例" />
            </a-form-item>
            <a-form-item
              :field="`form.judgeCase[${idx}].output`"
              :label="`输出用例${idx}`"
              :key="idx"
            >
              <a-input v-model="item.output" placeholder="请输入输出用例" />
            </a-form-item>
            <a-button status="danger" @click="removeCase(idx)"
              >删除此案例
            </a-button>
          </a-space>
        </a-form-item>
        <div style="margin-top: 32px">
          <a-button @click="addCase" type="outline" status="normal">
            添加测试案例
          </a-button>
        </div>
      </a-form-item>

      <a-form-item style="margin-top: 16px">
        <a-button type="primary" @click="doSubmit">Submit</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<style scoped>
#addQuestionView {
}
</style>
