<template>
  <div class="cart">
    <navbar class="nav-bar">
      <div slot="left" @click="backClick">
        <img src="@/assets/img/common/back.svg" alt="" class="back">
      </div>
      <div slot="center">已购商品 <span v-if="boughtGoodsLength">({{ boughtGoodsLength }})</span></div>
    </navbar>
    <div v-if="!boughtGoodsLength" style="position: absolute">还没有买过东西，快去看看吧~</div>
    <scroll class="content" ref="scroll">
      <cart-list class="cart-list" v-for="(item,index) in boughtList" :key="index" :product="item"/>
    </scroll>
  </div>
</template>

<script>
import navbar from "@/components/common/navBar/navbar";
import cartList from "@/views/cart/childComps/cartList";
import scroll from "@/components/common/scroll/scroll";
import cartBottomBar from "@/views/cart/childComps/cartBottomBar";
import {mapGetters} from "vuex"

export default {
  name: "cart",
  components: {
    navbar,
    cartList,
    scroll,
    cartBottomBar
  },
  computed: {
    ...mapGetters(['cartLength', 'boughtList', 'totalPrice', 'boughtGoodsLength'])
  },
  activated() {
    this.$refs.scroll.refresh()
  },
  methods: {
    backClick() {
      this.$router.back()
    }
  }
}
</script>

<style scoped>
.nav-bar {
  background: var(--color-tint);
  color: #ffffff;
  z-index: 111;
  position: relative;
}

.cart {
  height: 100vh;
}

.content {
  height: calc(100% - 44px - 49px - 40px);
}

.back {
  vertical-align: bottom;
}
</style>
