import { RouteRecordRaw } from "vue-router";
import AdminView from "@/views/AdminView.vue";
import NoAuthView from "@/views/NoAuthView.vue";
import AboutView from "@/views/AboutView.vue";
import ACCESS_ENUM from "@/access/accessEnum";
import UserLayout from "@/layouts/UserLayout.vue";
import UserLoginView from "@/views/user/UserLoginView.vue";
import UserRegisterView from "@/views/user/UserRegisterView.vue";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import HomeView from "@/views/HomeView.vue";
import AddQuestionView from "@/views/question/AddQuestionView.vue";
import ManageQuestionView from "@/views/question/ManageQuestionView.vue";

export const routes: Array<RouteRecordRaw> = [
  {
    path: "/user",
    name: "用户页面",
    component: UserLayout,
    meta: {
      hideInMenu: true
    },
    children: [
      {
        path: "login",
        name: "用户登录",
        component: UserLoginView
      },
      {
        path: "register",
        name: "用户注册",
        component: UserRegisterView
      }
    ]
  },
  {
    path: "/",
    name: "浏览题目",
    component: HomeView
  },
  {
    path: "/noAuth",
    name: "无权限",
    component: NoAuthView,
    meta: {
      hideInMenu: true
    },
  },
  {
    path: "/add/question",
    name: "添加题目",
    component: AddQuestionView,
    meta: {
      access: ACCESS_ENUM.USER
    }
  },
  {
    path: "/update/question",
    name: "修改题目",
    component: AddQuestionView,
    meta: {
      access: ACCESS_ENUM.USER,
      hideInMenu: true
    }
  },
  {
    path: "/Manage/question",
    name: "管理题目",
    component: ManageQuestionView,
    meta: {
      access: ACCESS_ENUM.ADMIN
    }
  },
  {
    path: "/about",
    name: "关于我的",
    component: AboutView
  }
];
