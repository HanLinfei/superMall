<template>
  <div class="cart-bottom-bar">
    <div class="bar-container">
      <checked class="checked" :is-checked="isSelectAll" @click.native="Allchecked"/>
      <span>全选</span>
      <div class="price">
        <span>合计:</span>
        <p>{{ "￥" + totalPrice }}</p>
      </div>
      <div class="buy" @click="buyClick">
        去购买({{ cartBuyLength }})
      </div>
    </div>
  </div>
</template>

<script>
import checked from "@/components/common/checkBox/checked";
import {mapGetters, mapActions} from "vuex";

export default {
  name: "cartBottomBar",
  components: {
    checked
  },
  computed: {
    ...mapGetters(['cartLength', 'cartList', 'cartBuyLength', 'totalPrice', 'moneyBalance']),

    isSelectAll() {
      if (this.cartBuyLength === 0)
        return false
      return !(this.cartList.some(item => !item.checked))
    }
  },
  methods: {
    ...mapActions(['Buy']),
    Allchecked() {
      if (this.isSelectAll) {
        this.cartList.forEach(item => item.checked = false)
      } else {
        this.cartList.forEach(item => item.checked = true)
      }
    },
    buyClick() {
      if (!(this.cartList.some(item => item.checked))) {
        this.$toast.show("请选择要购买的商品", 2000)
      } else if (this.$store.state.User.length) {
        this.Buy().then(res => {
          this.$toast.show(res, 2000)
        }).catch(err => {
          this.$toast.show(err, 2000)
        })
      } else {
        this.$toast.show("没有账号请先进入'我的'界面")
      }
    }
  }
}
</script>

<style scoped>
.cart-bottom-bar {
  background: #ffffff;
  padding: 0 0 0 30px;
  height: 40px;
  position: relative;
  box-shadow: 0 -3px 8px #cccccc;
}

.bar-container {
  height: 100%;
  display: flex;
  align-items: center;
}

.bar-container > span {
  color: var(--color-text);
  font-size: 13px;
  margin-left: 5px;
}

.price {
  display: flex;
  flex: 2;
  justify-content: center;
  align-items: center;
}

.price > span {
  color: var(--color-text);
  font-size: 13px;
  margin-left: 5px;
}

.price > p {
  font-size: 20px;
  color: #ff8198;
  margin-left: 5px;
}

.buy {
  flex: 1;
  display: flex;
  justify-content: center;
  background: #ff8198;
  height: 100%;
  align-items: center;
  color: #ffffff;
}
</style>
