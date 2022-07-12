import backTop from "@/components/content/backTop";

export const backTopMixin = {
  components: {
    backTop
  },
  data() {
    return {
      backIsShow: false,//返回按钮是否显示
    }
  },
  methods: {
    //回到顶部
    backTop() {
      this.$refs.scroll.scrollTo(0, 0, 600)
    },
  }
}
