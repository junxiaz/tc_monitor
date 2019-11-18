<template>
  <div class>
    <!--导航菜单-->
    <el-menu
      :default-active="$route.path"
      background-color="#2B3C6F"
      text-color="#fff"
      active-text-color="#1EABFF"
      router
      ref="menu"
    >
      <template v-if="menus[1]">
        <template v-for="(menu,index) in menus[1].children">
          <el-menu-item v-if="!menu.hideen" :index="menu.path" :key="index">
            <i :class="menu.icon"></i>
            <span>{{menu.name}}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>
<style lang="scss">
.el-menu-item i {
  color: #fff;
}
.el-menu-item .is-active {
  background: #324c9d !important;
}
</style>
<script>
import "@/assets/css/iconfont.css";
export default {
  name: "sideMeuns",
  props: {
    routes: {
      type: Array,
      default: () => []
    }
  },
  // watch: {
  // '$route' () {
  //   this.activeIndex = this.$refs.menu.activeIndex;
  // }
  // },
  data() {
    return {
      menus: "",
      activeIndex: ''
    };
  },

  mounted() {
    this.menus = this.routes;
  }
};
</script>