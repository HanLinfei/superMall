<template>
  <div>
    <navbar>
      <div slot="left" @click="backClick">
        <img src="@/assets/img/common/back.svg" alt="" class="back">
      </div>
      <div slot="center" class="title">
        <div v-for="(item,index) in title" class="title-item" @click="itemClick(index)"
             :class="{active:currentIndex===index}">
          {{ item }}
        </div>
      </div>
    </navbar>
  </div>
</template>

<script>
import navbar from "@/components/common/navBar/navbar";

export default {
  name: "DetailNavBar",
  components: {
    navbar
  },
  data() {
    return {
      title: ['商品', '参数', '评论', '推荐'],
      currentIndex: 0
    }
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index
    },
    backClick() {
      this.$router.back()
    }
  }
}
</script>

<style scoped>
.title {
  width: 100%;
  display: flex;
  justify-content: center;
}

.title > .title-item {
  flex: 1;
  display: flex;
  justify-content: center;
  font-size: 14px;
}

.active {
  color: var(--color-high-text);
}

.back {
  vertical-align: bottom;
}
</style>
