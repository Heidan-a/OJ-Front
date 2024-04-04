<script setup lang="ts">
import { onMounted, ref } from "vue";
import type { TableColumnsType } from "ant-design-vue";
import { Question, QuestionControllerService } from "../../../generated";
import message from "@arco-design/web-vue/es/message";

import { useRouter } from "vue-router";

const searchParam = ref({
  pageSize: 10,
  pageNum: 1,
});
const router = useRouter()
const dataList = ref([]);
const total = ref(0);
const uploadData = async () => {
  const res = await QuestionControllerService.listQuestionByPageUsingPost(
    searchParam.value
  );
  if (res.code === 0) {
    dataList.value = res.data.records;
    total.value = res.data.total;
  } else {
    message.error("加载失败：", res.message);
  }
};
onMounted(() => {
  uploadData();
});
const columns = [
  {
    dataIndex: "id",
    title: "ID",
  },
  {
    dataIndex: "title",
    title: "题目",
  },
  {
    dataIndex: "content",
    title: "内容",
  },
  {
    dataIndex: "tags",
    title: "标签",
  },
  {
    dataIndex: "answer",
    title: "答案",
  },
  {
    dataIndex: "submitNum",
    title: "提交数",
  },
  {
    dataIndex: "thumbSum",
    title: "通过数",
  },
  {
    dataIndex: "judgeConfig",
    title: "判题配置",
  },
  {
    dataIndex: "judgeCase",
    title: "判题案例",
  },
  {
    dataIndex: "userId",
    title: "用户id",
  },
  {
    dataIndex: "createTime",
    title: "创建时间",
  },
  {
    slotName: "optional",
    title: "操作",
  },
];
const deleteQuestion = async (question: Question) => {
  const res = await QuestionControllerService.deleteQuestionUsingPost({
    id: question.id,
  });
  if (res.code === 0) {
    message.success("删除成功");
    uploadData();
  } else {
    message.error("删除失败：", res.message);
  }
};
const updateQuestion = (question: Question) => {
  router.push({
    path: "/update/question",
    query: {
      id: question.id,
    },
  });
};
</script>

<template>
  <div id="manageQuestionView">
    <h2>题目管理</h2>
    <a-table
      :columns="columns"
      :data="dataList"
      :pagination="{
        showTotal: true,
        pageSize: searchParam.pageSize,
        current: searchParam.pageNum,
        total,
      }"
    >
      <template #optional="{ record }">
        <a-space>
          <a-button status="success" @click="updateQuestion(record)"
            >修改
          </a-button>
          <a-button status="danger" @click="deleteQuestion(record)"
            >删除
          </a-button>
        </a-space>
      </template>
    </a-table>
  </div>
</template>

<style scoped>
#manageQuestionView {
}
</style>
