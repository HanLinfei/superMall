<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive">
      <slot name="item-icon"></slot>
    </div>
    <div v-else>
      <slot name="item-icon-active"></slot>
    </div>
    <div :style="activeStyle">
      <slot name="item-text"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "tabBarItem",
  data() {
    return {};
  },
  props: {
    path: String,
    activeColor: {
      type: [String, Number],
      default: "rgb(255,127,172)",
    },
  },
  methods: {
    itemClick() {
      this.$router.replace(this.path).catch((err) => err);
    },
  },
  computed: {
    isActive() {
      return this.$route.path.indexOf(this.path) !== -1;
    },
    activeStyle() {
      return this.isActive ? {color: this.activeColor} : {};
    },
  },
};
</script>

<style scoped>
.tab-bar-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* tabBar的高度一般是49px*/
  height: 49px;
  font-size: 13px;
}

.tab-bar-item img {
  width: 24px;
  height: 24px;
  vertical-align: bottom;
}
</style>
