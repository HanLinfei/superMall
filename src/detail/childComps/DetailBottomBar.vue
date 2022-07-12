<template>
  <div class="botomBar">
    <div class="left">
      <div>
        <span></span>
        <p>客服</p>
      </div>
      <div>
        <span></span>
        <p>店铺</p>
      </div>
      <div>
        <span></span>
        <p>收藏</p>
      </div>
    </div>
    <div class="right">
      <div @click="addToCart" class="addCart">
        <p>加入购物车 <span>({{ $store.getters.cartLength }})</span></p>
      </div>
      <div>购买</div>

    </div>
  </div>
</template>

<script>
export default {
  name: "DetailBottomBar",
  methods: {
    addToCart() {
      this.$emit("addCart")
    }
  }
}
</script>

<style scoped>

.botomBar {
  height: 49px;
  position: relative;
  background: #ffffff;
  display: flex;
  z-index: 100;
}

.botomBar > div {
  flex: 1;
}

.left {
  display: flex;

}

.left > div {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}


.left > div > span {
  flex: 2;
}

.left > div > p {
  flex: 1;
  font-size: 13px;
}

.left > div:nth-child(1) > span {
  display: block;
  background: url("@/assets/img/detail/detail_bottom.png");
  background-size: 70%;
  background-repeat: no-repeat;
  width: 60%;
  background-position: 7px -63px;
}

.left > div:nth-child(2) > span {
  display: block;
  background: url("@/assets/img/detail/detail_bottom.png");
  background-size: 70%;
  background-repeat: no-repeat;
  width: 60%;
  background-position: 7px -120px;
}

.left > div:nth-child(3) > span {
  display: block;
  background: url("@/assets/img/detail/detail_bottom.png");
  background-size: 70%;
  background-repeat: no-repeat;
  width: 60%;
  background-position: 7px 2px;
}

.right {
  display: flex;
}

.right > div {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.right > div:nth-child(1) {
  color: #ffffff;
  background: rgba(255, 221, 17);
  flex: 2;
}

.right > div:nth-child(2) {
  background: #ff5777;
  color: #ffffff;

}


</style>
