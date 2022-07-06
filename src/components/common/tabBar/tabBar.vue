<template>
  <div id="tab-bar">
    <slot></slot>
  </div>
</template>

<script>
import tabBarItem from "./tabBarItem";

export default {
  name: "tabBar",
  components: {
    tabBarItem,
  },
};
</script>

<style scoped>
#tab-bar {
  width: 100%;
  background-color: #f6f6f6;
  display: flex;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  box-shadow: 0 -2px 1px rgba(100, 100, 100, 0.1);
}
</style>
