<template>
  <div class="detail-swiper">
    <swiper>
      <swiper-item v-for="item in swiperImgs" class="swiper-item">
        <a href="">
          <img :src="item" alt="">
        </a>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import swiper from "@/components/common/swiper/Swiper";
import swiperItem from "@/components/common/swiper/SwiperItem";

export default {
  name: "DetailSwiper",
  components: {
    swiper,
    swiperItem
  },
  props: {
    swiperImgs: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style scoped>
/*.detail-swiper .swiper-item img {*/
/*  height: 200px;*/
/*  object-fit: cover;*/
/*}*/
.swiper-item {
  height: 300px;
}
</style>
