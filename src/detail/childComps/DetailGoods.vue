<template>
  <div class="goodsInfo" v-if="Object.keys(goods).length !== 0">
    <div class="title">{{ goods.title }}</div>
    <div class="price">
      <p>{{ "￥" + goods.realPrice }}</p>
      <p v-if="goods.oldPrice">{{ goods.oldPrice }}</p>
      <p>{{ goods.discount }}</p>
    </div>
    <div class="columns">
      <p v-for="(item,index) in goods.columns" :key="index">
        {{ item }}
      </p>
    </div>
    <div class="services">
      <div v-for="(item,index) in goods.services" class="services-item" :key="index">
        <img :src="item.icon" alt="">
        <p>{{ item.name }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailGoods",
  props: {
    goods: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>

<style scoped>
.goodsInfo {
  padding: 0 6px;
}

.title {
  margin-top: 6px;
  font-size: 14px;
  font-weight: bold;
  color: var(--color-text);
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.price {
  display: flex;
  margin-top: 5px;
}

.price > p:nth-child(1) {
  font-size: 19px;
  font-weight: 600;
  color: var(--color-high-text);
}

.price > p:nth-child(2) {
  padding: 0 8px;
  font-size: 13px;
  color: grey;
  margin-top: 7px;
  text-decoration: line-through;
}

.price > p:nth-child(3) {
  background: rgba(241, 62, 58);
  padding: 0 4px;
  border-radius: 8px;
  color: white;
  font-size: 12px;
  height: 20px;
}

.columns {
  padding: 5px;
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  color: var(--color-text);
  border-bottom: 1px solid #ccc;
}

.services {
  padding: 8px 0;
  display: flex;
  justify-content: space-between;
  font-size: 10px;
}

.services img {
  margin-top: 1px;
  width: 15px;
  height: 15px;
}

.services-item {
  display: flex;
}
</style>
