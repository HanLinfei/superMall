<template>
  <div class="wrapper" ref="wrapper">
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "@better-scroll/core"
import Pullup from '@better-scroll/pull-up'


BScroll.use(Pullup)
export default {
  name: "scroll",
  data() {
    return {
      scroll: null,
      refreshFn: null,
    }
  },
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    // console.log(this.$refs.wrapper)
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true,
      flickLimitDistance: 50,
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad,
      useTransition: false,
    })

    this.scroll.on('scroll', this.onScroll)
    this.scroll.on('pullingUp', this.onPullingDown)
  },
  methods: {
    scrollTo(x, y, animationMs) {
      this.scroll.scrollTo(x, y, animationMs = 500)
    },
    onScroll(position) {
      this.$emit("scroll", position)
    },
    onPullingDown() {
      console.log("------")
      this.$emit("pullingUp")
    },
    refresh() {
      this.scroll.refresh()
      setTimeout(() => {
        this.scroll.finishPullUp()
      })
    }
  },
  updated() {
    //数据发生改变之后 重新计算高度
    this.scroll.refresh()
  },
}
</script>

<style scoped>

</style>
