<template>
  <div class="detail-info" v-if="Object.keys(detailInfo).length !== 0">
    <div class="title">
      <p>{{ detailInfo.desc }}</p>
    </div>
    <div class="imgs">
      <ul>
        <li v-for="(item,index) in detailInfo.detailImage[0].list" :key="index">
          <img :src="item" alt="" @load="imgLoad">
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import debounce from "@/tool/debounce";

export default {
  name: "DetailInfo",
  data() {
    return {
      imgRenderIndex: 0,
      debounceImgLoadFn: null,
    }
  },
  props: {
    detailInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    imgLoad() {
      this.debounceImgLoadFn()
      if (++this.imgRenderIndex === this.detailInfo.detailImage[0].list.length) {
        this.$emit("SuccessRenderImg")
      }
    }

    // debounceImgLoad() {
    //   this.$emit("imgLoad")
    // }
  },
  mounted() {
    // this.debounceImgLoadFn = debounce(this.debounceImgLoad, 100, true)
    function sendRender() {
      this.$emit("imgLoad")
    }

    this.debounceImgLoadFn = debounce(sendRender, 300, true)
  }
}
</script>

<style scoped>
.detail-info {
  padding: 0 6px;
}

.imgs {
  margin-top: 10px;
}

.title > p {
  margin-top: 10px;
  font-size: 12px;
  color: var(--color-text);
}

img {
  width: 100%;
}
</style>
