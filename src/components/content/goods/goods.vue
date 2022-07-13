<template>
  <div class="goods" :style="{height:height+'px'}">
    <!--   瀑布流组件  -->
    <vue-waterfall-easy :imgs-arr="goods" class="waterfall" :mobileGap="12" ref="waterfall"
                        @preloaded="imgSuccess" :cols="2" @click="itemClick" cardAnimationClass=""
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
    //瀑布流图片加载完毕回调函数
    imgSuccess() {
      //此处需要异步加载 因为同步加载时候 此时数据还没渲染上去 拿不到 异步加载用于下一轮拿数据
      setTimeout(() => {
        //比较两列高度 大的一边为当前瀑布流容器高度
        this.height = this.$refs.waterfall.colsHeightArr[0] > this.$refs.waterfall.colsHeightArr[1] ? this.$refs.waterfall.colsHeightArr[0] : this.$refs.waterfall.colsHeightArr[1]
        this.$nextTick(() => {
          if (this.$route.path.indexOf("/home") !== -1) {
            this.$bus.$emit('itemImageLoad') //高度得到后发送事件 计算容器滑动高度
          } else if (this.$route.path.indexOf("/detail") !== -1) {
            this.$emit("imgLoad")//计算高度
          } else {
            this.$emit("imgLoad")
          }
        })
      })
    },
    //路由跳转 跳转商品详情页
    itemClick(e, {index, value}) {
      console.log('点击')
      // this.$router.push(`/detail/${value.iid}`)
      this.$router.push({
        path: "/detail",
        query: {
          iid: value.iid
        }
      })
    }
  },
}
</script>

<style scoped>
.goods {
  background: #ffffff;
}

.waterfall {

}
</style>
