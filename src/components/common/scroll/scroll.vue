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
import throttle from "@/tool/throttle";

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
      pullUpLoad: {
        type: this.pullUpLoad,
        threshold: 4000 //距离底部4000时候就触发上拉事件 多加载一个content
      },
      useTransition: false,//移动端禁用css3动画 防止卡顿
    })
    // let throttleUpdown = throttle(this.onPullingDown, 1000)
    this.scroll.on('scroll', this.onScroll)
    // this.scroll.on('pullingUp', this.onPullingDown)
    this.scroll.on('pullingUp', throttle(this.onPullingDown, 1500)) //此处节流处理 防止用户短时间多次滑动请求数据
  },
  methods: {
    //容器位置函数
    scrollTo(x, y, animationMs) {
      this.scroll.scrollTo(x, y, animationMs)
    },
    //监听容器的位置
    onScroll(position) {
      this.$emit("scroll", position)
    },
    //监听上拉事件
    onPullingDown() {
      this.$emit("pullingUp") //给父组件发送请求数据请求
    },
    //计算高度
    refresh() {
      this.scroll.refresh()
      this.pullUpLoad && this.scroll.finishPullUp()
    }
  },
}
</script>

<style scoped>

</style>
