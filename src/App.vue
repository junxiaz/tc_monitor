<template>
  <div id="app">
    <keep-alive><router-view /></keep-alive>
  </div>
</template>

<style lang="scss" scoped>
@import url('./assets/css/reset.css');
@import url('./assets/css/index.scss');
</style>

<script>
export default {
  name: 'app'
}
</script>
