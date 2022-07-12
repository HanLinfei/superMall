<template>
  <div class="cart-list" v-if="product">
    <div class="list-item">
      <checked class="checkbox" @click.native="checkClick" :is-checked="product.checked"/>
      <div class="img">
        <img :src="product.image" alt="">
      </div>
      <div class="title">
        <p>{{ product.title }}</p>
        <p>{{ product.desc }}</p>
        <div class="price">
          <p>{{ "￥" + product.price }}</p>
          <p>{{ "×" + product.count }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import checked from "@/components/common/checkBox/checked";

export default {
  name: "cartList",
  components: {
    checked
  },
  data() {
    return {}
  },
  props: {
    product: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    checkClick() {
      this.product.checked = !this.product.checked
    }
  }
}
</script>

<style scoped>
.list-item {
  padding-top: 10px;
  display: flex;
  justify-content: center;
  align-content: center;
  border-bottom: 1px solid #cccccc;
}

.checkbox {
  flex: 0 0 10%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.list-item > .img {
  flex: 0 0 20%;
}

.list-item > .img img {
  width: 100%;
  border-radius: 8px;
}

.title {
  padding: 0 5px 10px 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.title > p:nth-child(1) {
  font-size: 18px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}

.title > p:nth-child(2) {
  font-size: 13px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}

.title > .price {
  padding: 0 15px;
  display: flex;
  justify-content: space-between;
}

.title > .price > p:nth-child(1) {
  font-size: 20px;
  color: #ff8198;
}

.title > .price > p:nth-child(2) {
  display: flex;
  align-items: center;
}
</style>
