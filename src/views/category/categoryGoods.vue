<template>
  <div class="categoryGoods" :style="{height:height+'px'}">

  </div>
</template>

<script>
import vueWaterfallEasy from "vue-waterfall-easy";

export default {
  name: "categoryGoods",
  components: {
    vueWaterfallEasy
  },
  data() {
    return {
      height: 3000
    }
  },
  props: {
    goods: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style scoped>
.categoryGoods {
  width: 100%;
}


</style>
