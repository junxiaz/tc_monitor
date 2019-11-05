<template>
  <div class="app_wapper">
    <el-container style="width: 100%; height:100%; margin: 0;">
      <el-header style="text-align: right; font-size: 16px">
        <div class="logo">
            <img src="../assets/imgs/logo.png" alt />
            <span>天臣监控管理系统</span>
        </div>
        <span style="margin-right:10px;">{{userName}}</span>
        <el-button @click="outSystem" type="small">退出</el-button>
      </el-header>
      <!-- 内容区域 -->
      <el-container class="app_content">
        <!-- 左侧菜单 -->
        <el-aside class="slider_container">
          <!-- 菜单组件 -->
          <SideMenus :routes="getRoutes"></SideMenus>
        </el-aside>
        <!-- 内容区域 -->
        <el-main>
          <!-- 二级路由跳转 -->
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
// 左侧菜单组件
import SideMenus from "@/components/SideMenus.vue";
export default {
  data() {
    return {

    };
  },
  computed: {
    getRoutes() {
      return global.antRouter;
    },
    userName() {
      return window.sessionStorage.getItem('userName')
    }
  },
  components: {
    SideMenus
  },
  methods: {
    outSystem() {
      //退出系统
      sessionStorage.setItem("userName", "");
      // 跳转到登录页的时候顺便刷新
      window.location.href = window.location.origin + window.location.pathname;
    }
  },
  mounted() {
    // console.log("菜单的展开跟路由有关系，查看elementui--el-menu  的default-active 属性")
    // console.log(this.$route.path)
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
/*wapper*/
.app_wapper {
  position: relative;
  height: 100%;
  width: 100%;
}

.el-header {
  background: #1EABFF;
  color: #fff;
  line-height: 56px;
  width: 100%;
}

.el-main {
    height: 100%;
    width: 100%;
    padding: 30px;
    background: #f7faff;
}

.app_wapper .el-aside{
  width: 200px !important;
  height: 100%;
  z-index: 1001;
  background-color: #2B3C6F;
}

.logo {
  float: left;
  font-size: 16px;
}

.logo img {
  vertical-align: middle;
  margin-right: 10px;
}
</style>
