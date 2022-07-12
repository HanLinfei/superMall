<template>
  <div class="toast" v-show="isShow">
    <div>{{ message }}</div>
  </div>
</template>

<script>
import throttle from "@/tool/throttle";

export default {
  name: "toast",
  props: {
    // message: {
    //   type: String,
    //   default: "Message"
    // },
    // show: {
    //   type: Boolean,
    //   default: false
  },
  data() {
    return {
      message: '',
      isShow: false,
      timer: null,
    }
  },
  methods: {
    show(message, duration = 2000) {
      clearTimeout(this.timer)
      this.isShow = true
      this.message = message

      this.timer = setTimeout(() => {
        this.isShow = false
        this.message = ''
      }, duration)
    }
  },
}
</script>

<style scoped>
.toast {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 8px 10px;
  background: rgba(0, 0, 0, .6);
  color: #ffffff;
  border-radius: 10px;
  z-index: 999;
}
</style>
