<template>
  <div class="back-top">
    <img src="@/assets/img/common/top.png" alt="">
  </div>
</template>

<script>
export default {
  name: "backTop",
  data() {
    return {
      isShow: "none"
    }
  },
  methods: {}
}
</script>

<style scoped>
.back-top {
  position: fixed;
  right: 10px;
  bottom: 120px;
  width: 48px;
  height: 48px;
}

.back-top img {
  width: 100%;
  height: 100%;
}
</style>
