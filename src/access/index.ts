import store from "@/store";
import router from "@/router";
import ACCESS_ENUM from "@/access/accessEnum";
import checkAccess from "@/access/checkAccess";

router.beforeEach(async (to, from, next) => {
  if (to.meta?.access === "admin") {
    if (store.state.user.loginUser?.userRole !== "admin") {
      next("noAuth");
      return;
    }
  }
  const loginUser = store.state.user.loginUser;
  if (!loginUser || !loginUser.userRole) {
    //等用户登录之后在校验
    await store.dispatch("user/getLoginUser");
  }
  //跳转权限
  const needAccess = to?.meta?.access ?? ACCESS_ENUM.NOT_LOGIN;
  //开放游客不能访问的页面
  if (needAccess !== ACCESS_ENUM.NOT_LOGIN) {
    if (!loginUser || !loginUser.userRole) {
      next(`/user/login?redirect=${to.fullPath}`);
      return;
    }
    if (!checkAccess(loginUser, needAccess as string)) {
      next("/noAuth");
      return;
    }
  }
  next();
});
