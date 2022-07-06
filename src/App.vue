<template>
  <div id="app">
    <keep-alive exclude="detail">
      <router-view></router-view>
    </keep-alive>
    <main-tab-bar></main-tab-bar>
  </div>
</template>
<script>
import mainTabBar from "@/components/content/mainTabBar";

export default {
  name: "app",
  components: {
    mainTabBar
  }
}
</script>
<style>
@import "assets/css/base.css";

#app {
  width: 100%;
  height: 100%;
  position: relative;
}
</style>
