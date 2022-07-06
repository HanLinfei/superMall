<template>
  <div class="goods-item">
    <div class="title">
      <p>{{ goodsItem.title }}</p>
    </div>
    <div class="details">
      <p class="price">￥{{ goodsItem.price }}</p>
      <p class="cfav">{{ goodsItem.cfav }} <span> <img src="@/assets/img/home/star.svg" alt=""
                                                       style="vertical-align: text-bottom"> </span>
      </p>
    </div>
    <div></div>
  </div>
</template>

<script>
import Profile from "@/views/profile/profile";

export default {
  name: "goodsItem",
  components: {Profile},
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {}
}
</script>

<style scoped>
.goods-item {
  display: flex;
  flex-direction: column;
}

.title {
  color: #000;
  font-size: 12px;
  padding: 2px 6px;
}

.title > p {
  display: flex;
  justify-content: center;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.details {
  display: flex;
  justify-content: space-around;
}

.details > .price {
  color: var(--color-tint);
  font-size: 20px;
}

.details > .cfav {
  font-size: 14px;
  margin-top: 5px;
}
</style>
