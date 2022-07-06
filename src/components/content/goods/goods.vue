<template>
  <div class="goods" :style="{height:height+'px'}">
    <!--    <goods-item v-for="item in goods" :goods-item="item"/>-->
    <vue-waterfall-easy :imgs-arr="goods" class="waterfall" :mobileGap="12" ref="waterfall"
                        @preloaded="imgSuccess" :cols="2" @click="itemClick"
    >
      <div slot-scope="props">
        <goods-item :goods-item="props.value"></goods-item>
      </div>
    </vue-waterfall-easy>
  </div>
</template>

<script>

import goodsItem from "@/components/content/goods/goodsItem";
import vueWaterfallEasy from 'vue-waterfall-easy'

export default {
  name: "goods",
  components: {
    goodsItem,
    vueWaterfallEasy
  },
  data() {
    return {
      height: 0
    }
  },
  props: {
    goods: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods: {
    imgSuccess() {
      console.log('图片加载完毕')
      setTimeout(() => {
        this.height = this.$refs.waterfall.colsHeightArr[0] > this.$refs.waterfall.colsHeightArr[1] ? this.$refs.waterfall.colsHeightArr[0] : this.$refs.waterfall.colsHeightArr[1]
        this.$bus.$emit('itemImageLoad')
      })
    },
    itemClick(e, {index, value}) {
      this.$router.push(`/detail/${value.iid}`)
    }
  },
}
</script>

<style scoped>


.waterfall {
  
}
</style>
