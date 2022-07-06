<template>
  <div class="nav-bar">
    <div class="left">
      <slot name="left"></slot>
    </div>
    <div class="center">
      <slot name="center"></slot>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "Navbar"
}
</script>

<style scoped>
.nav-bar {
  display: flex;
  height: 44px;
  box-shadow: 0 5px 8px rgba(100, 100, 100, 0.2);
}

.left, .right {
  width: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.center {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>
