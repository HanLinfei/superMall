<template>
  <div class="shopInfo" v-if="Object.keys(shopInfo).length !== 0">
    <div class="name">
      <img :src="shopInfo.logo" alt="">
      <div>{{ shopInfo.name }}</div>
      <div class="fans">粉丝数：<span>{{ shopInfo.fans }}</span></div>
    </div>
    <div class="bottom">
      <div class="left">
        <div class="sell">
          <p>{{ formatSell }}</p>
          <p class="sell-title">总销量</p>
        </div>
        <div class="goodsCount">
          <p>{{ shopInfo.goodsCount }}</p>
          <p class="sell-title">全部宝贝</p>
        </div>
      </div>
      <div class="right">
        <div v-for="(item,index) in shopInfo.score" class="score" :key="index">
          <div class="score-left">
            <p class="score-name">{{ item.name }}</p>
            <p class="score-score" :class="{levelColor:item.isBetter}">{{ item.score }}</p>
          </div>
          <div class="level">
            <p :class="{levelHigh:item.isBetter}">
              {{ item.isBetter ? "高" : "低" }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="goShop">进店逛逛</div>
  </div>
</template>

<script>
export default {
  name: "DetailShopInfo",
  props: {
    shopInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  computed: {
    //销量格式化
    formatSell() {
      let sell = this.shopInfo.sells
      let formarSell = parseInt(sell / 10000) + "." + parseInt(sell % 10000 / 1000) + "w"
      return sell > 10000 ? formarSell : sell
    }
  }
}
</script>

<style scoped>
.shopInfo {
  padding: 0 6px;
  border-top: 2px solid whitesmoke;
  border-bottom: 2px solid whitesmoke;
}

.name {
  margin-top: 6px;
  display: flex;
  align-items: center;
  color: var(--color-text);
  font-size: 15px;
  position: relative;
}

.name img {
  border-radius: 50%;
  width: 50px;
}

.name > div {
  margin-left: 5px;
}

.fans {
  font-size: 13px;
  position: absolute;
  right: 10px;
  top: 30px
}

.fans > span {
  color: #ff5777;
}

.left {
  flex: 1;
  display: flex;
  font-size: 14px;
  justify-content: space-evenly;
  align-items: center;
}

.right {
  flex: 1;
}

.level {
  color: white;
  flex: 1;
  font-size: 13px;
  display: flex;
  justify-content: flex-end;
  padding-right: 5px;
}

.level > p {
  background-color: rgba(7, 163, 7);
  padding: 0 3px;
}

.score {

  display: flex;
  margin-left: 40px;
  /*justify-content: space-evenly;*/
}

.score-left {
  display: flex;
  flex: 2;
}

.score-name {
  font-size: 12px;
}

.score-score {
  color: rgba(7, 163, 7);
  font-size: 12px;
  margin-left: 8px;
}

.bottom {
  justify-content: space-around;
  display: flex;
  margin-top: 10px;
}

.sell-title {
  font-size: 12px;
}

.levelHigh {
  background: var(--color-tint) !important;
}

.levelColor {
  color: #ff5777;
}

.goShop {
  width: 100px;
  padding: 4px 0;
  display: flex;
  margin: 10px auto;
  justify-content: center;
  background: rgba(242, 245, 252);
  border-radius: 8px;
  font-size: 14px;
  color: var(--color-text);
}
</style>
