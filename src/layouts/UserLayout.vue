<template>
  <div id="userLayout">
    <a-layout style="min-height: 100vh">
      <a-layout-header class="header">
        <a-space>
          <div>OJ</div>
        </a-space>
      </a-layout-header>
      <a-layout-content class="content">
        <router-view />
      </a-layout-content>
      <a-layout-footer class="footer">黑马士兵版权所有</a-layout-footer>
    </a-layout>
  </div>
</template>

<style scoped>
#userLayout {
  text-align: center;
}

#userLayout .header {
  margin-top: 16px;
}

#userLayout .logo {
  height: 64px;
  width: 64px;
}

#userLayout .content {
  margin-top: 16px;
  padding: 20px;
}

#userLayout .footer {
  background-color: #efefef;
  padding: 16px;
  position: sticky;
  bottom: 0;
  right: 0;
  left: 0;
  text-align: center;
}

.logo {
}
</style>
<script setup lang="ts"></script>
