<template>
  <div class="cart">
    <navbar class="nav-bar">
      <div slot="center">购物车 <span v-if="cartLength">({{ cartLength }})</span></div>
    </navbar>
    <scroll class="content" ref="scroll">
      <cart-list class="cart-list" v-for="(item,index) in cartList" :key="index" :product="item"/>
    </scroll>
    <cart-bottom-bar/>
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
    ...mapGetters(['cartLength', 'cartList'])
  },
  activated() {
    this.$refs.scroll.refresh()
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
</style>
