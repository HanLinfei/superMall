<template>
  <swiper>
    <swiper-item v-for="item in banners">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="swiperImgSuccess">
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
import {Swiper, SwiperItem} from "@/components/common/swiper/index"

export default {
  name: "homeSwiper",
  data() {
    return {
      swiperRenderIndex: 0
    }
  },
  components: {
    Swiper,
    SwiperItem,

  },
  //父组件拿到轮播图数据之后传过来
  props: {
    banners: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods: {
    //监听轮播图的图片是否全部加载完成
    swiperImgSuccess() {
      if (this.swiperRenderIndex === this.banners.length - 1) {
        this.$emit("swiperImgLoadSuccess")
        this.swiperRenderIndex = 0
      }
      this.swiperRenderIndex++
    }
  }
}
</script>

<style scoped>

</style>
