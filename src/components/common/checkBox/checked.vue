<template>
  <div>
    <div class="checked">
      <img src="@/assets/img/cart/tick.svg" alt="" v-if="isChecked">
    </div>
  </div>
</template>

<script>
export default {
  name: "checked",
  data() {
    return {}
  },
  props: {
    isChecked: {
      type: Boolean,
      default: true
    }
  },
}
</script>

<style scoped>
.checked {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background: #ff8198;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #ccc;
}

.checked img {
  width: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
