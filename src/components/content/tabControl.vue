<template>
  <div>
    <ul>
      <li v-for="(item,index) in titles" @click="itemClick(index)">
        <div class="text" :class="{activeStyle:currentIndex===index}">{{ item }}</div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "tabControl",
  data() {
    return {
      currentIndex: 0
    }
  },
  props: {
    titles: {
      type: Array,
      default() {
        return []
      }
    },
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index
      this.$emit("tabClick", index)
    }
  }
}
</script>

<style scoped>
div {
  padding: 5px 0;
}

ul {
  display: flex;
}

ul > li {
  flex: 1;
  display: flex;
  justify-content: center;
}

.text {
  width: 50%;
  display: flex;
  justify-content: center;
  padding-bottom: 5px;
}

.activeStyle {
  color: var(--color-tint);
  border-bottom: 5px solid var(--color-tint);
}
</style>
