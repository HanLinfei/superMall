<template>
  <div>
    <p>我是分类列表</p>
    <p>页面开发中</p>
  </div>
</template>

<script>
import BScroll from "@better-scroll/core"
import Pullup from '@better-scroll/pull-up'

BScroll.use(Pullup)
export default {
  name: "cartegory",
  mounted() {
    this.scroll = new BScroll(this.$refs.scroll, {
      // probeType: 3,
      click: true,
      pullUpLoad: true
    })
    this.scroll.on('scroll', this.onScroll)
    this.scroll.on("pullingUp", this.onPullingUp)
  },
  methods: {
    onScroll(position) {
      // console.log(position)
    },
    onPullingUp() {
      // console.log('上拉加载更多')
    }
  }
}
</script>

<style scoped>
.scroll-wrapper {
  height: 300px;
  background-color: red;
  position: relative;
  overflow: hidden;
}
</style>
