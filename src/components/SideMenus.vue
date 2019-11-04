<template>
  <div class="">
     <!--导航菜单-->
      <el-menu
        :default-active="$route.path"
        class="el-menu-demo"
        background-color="#2B3C6F"
        text-color="#fff"
        active-text-color="#1EABFF"
        router
      >
        <template v-for="(menu,index) in menus[1].children">
          <template>
            <el-menu-item :index="menu.path" :key="index">
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
    background: #324C9D!important;
}
</style>
<script>
import '@/assets/css/iconfont.css'
export default {
  name: 'sideMeuns',
  props: {
    routes: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      menus: ''
    }
  },

  mounted() {
    this.menus = this.routes
  }
}

</script>