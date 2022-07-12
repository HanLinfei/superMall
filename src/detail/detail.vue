<template>
  <div class="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="detailNav"/>
    <scroll class="content" :pull-up-load="true" ref="scroll" :probe-type="3" @scroll="contentScroll">
      <detail-swiper :swiperImgs="swiperImgs"/>
      <detail-goods :goods="goodsInfo"/>
      <detail-shop-info :shopInfo="shopInfo"/>
      <detail-info :detailInfo="detailInfo" @imgLoad="DebounceimgLoad" @SuccessRenderImg="SuccessRenderImg" ref="info"/>
      <detail-size :sizes="sizes" ref="size"/>
      <detail-comment :userComments="userComments" ref="comment"/>
      <goods :goods="goods" @imgLoad="SuccessRenderImg" class="goods" ref="goods"/>
    </scroll>
    <back-top @click.native="backTop" v-show="backIsShow"/>
    <detail-bottom-bar @addCart="addCart"/>
    <!--    <toast :message="message" :show="show"/>-->
  </div>
</template>

<script>
//业务组件
import detailNavBar from "@/detail/childComps/DetailNavBar";
import detailSwiper from "@/detail/childComps/DetailSwiper";
import detailGoods from "@/detail/childComps/DetailGoods";
import detailShopInfo from "@/detail/childComps/DetailShopInfo";
import detailInfo from "@/detail/childComps/DetailInfo";
import detailSize from "@/detail/childComps/DetailSize";
import detailComment from "@/detail/childComps/DetailComment";
import goods from "@/components/content/goods/goods";
import detailBottomBar from "@/detail/childComps/DetailBottomBar";
//数据请求
import {getDetail, shop, goodsInfo, goodsParam, getHomeGoods} from "@/network/detail";

//工具组件
import scroll from "@/components/common/scroll/scroll";
import {backTopMixin} from "@/mixin/mixin"

import {mapActions} from "vuex"


import Toast from "@/components/common/toast";

export default {
  name: "detail",
  components: {
    detailNavBar,
    detailSwiper,
    detailGoods,
    detailShopInfo,
    detailInfo,
    detailSize,
    detailComment,
    goods,
    detailBottomBar,
    scroll,
    Toast
  },
  data() {
    return {
      iid: null,
      swiperImgs: [],
      goodsInfo: {},
      shopInfo: {},
      detailInfo: {},
      sizes: {},
      userComments: {},
      goods: [],
      imgRenderCount: 0,
      themeTopY: [],
      currentIndex: 0,
      // message: '',
      // show: false
    }
  },
  mixins: [backTopMixin],
  created() {
    //获得当前活跃路由的IID
    this.iid = this.$route.query.iid

    //请求详情页数据
    this.responseDetail(this.iid)

    //请求推荐商品
    this.getRecommendGoods()
    console.log('哈哈哈')

  },
  //监听query变化 然后进行刷新跳转页面
  watch: {
    "$route.query.iid": {
      handler() {
        this.$router.go(0)
      }
    }
  },
  methods: {
    //响应详情页数据
    responseDetail(iid) {
      getDetail(iid).then(({data: {result}}) => {
        //轮播图信息
        this.swiperImgs.push(...result.itemInfo.topImages)
        //商品基本信息
        this.goodsInfo = new goodsInfo(
          result.itemInfo,
          result.columns,
          result.shopInfo.services
        )
        //商家信息
        this.shopInfo = new shop(result.shopInfo)
        //商品图片信息
        this.detailInfo = result.detailInfo
        //商品尺码信息
        this.sizes = new goodsParam(result.itemParams.info, result.itemParams.rule)
        //用户评价
        this.userComments = result.rate
      })
    },
    //底部推荐商品
    getRecommendGoods() {
      let types = ["pop", "new", "sell"]
      let type = ""
      let page = 0

      //随机获取商品类型 页码
      function random() {
        type = types[Math.floor(Math.random() * 2)]
        page = Math.floor(Math.random() * 20)
      }

      random()
      //根据随机商品类型以及页码请求数据
      getHomeGoods(type, page).then(res => {
        for (let i = 0; i < 12; i++) {
          let index = Math.floor(Math.random() * res.length)
          let result = res[index]
          this.goods.push(result)
          res.splice(index, 1)//防止展示同一个商品
        }
      }).catch(() => {
      })
    },
    //图片加载完毕后计算滑动容器高度
    //做了一个防抖处理  这边用于实时不断地更新容器滑动范围
    DebounceimgLoad() {
      this.$refs.scroll.refresh()
      console.log('加载中')
    },
    //两个组件图片都加载完成之后来获取最终的组件位置
    SuccessRenderImg() {
      if (++this.imgRenderCount === 2) {
        this.$refs.scroll.refresh()
        this.$nextTick(() => {
          this.themeTopY.push(0)
          this.themeTopY.push(this.$refs.size.$el.offsetTop - 44)
          this.themeTopY.push(this.$refs.comment.$el.offsetTop - 44)
          this.themeTopY.push(this.$refs.goods.$el.offsetTop - 44)
          this.imgRenderCount = 0
          console.log('全部加载完毕')
        })
      }
    },

    //监听标题单击跳转
    titleClick(index) {
      console.log(index)
      this.$refs.scroll.scrollTo(0, -this.themeTopY[index], 300)
    },
    //监听当前容易的位置
    contentScroll(position) {
      //返回顶部按钮是否显示
      this.backIsShow = (-position.y) > 1000

      const positionY = -position.y
      let length = this.themeTopY.length
      for (let i in this.themeTopY) {
        i = i *= 1
        if (this.currentIndex !== i && (i < length - 1 && positionY >= this.themeTopY[i] && positionY <= this.themeTopY[i + 1])
          || (i === length - 1 && positionY >= this.themeTopY[i])) {
          this.currentIndex = i
          this.$refs.detailNav.currentIndex = this.currentIndex
        }
      }
    },


    //actions映射
    ...mapActions(['addCartList']),

    addCart() {
      //获取商品需要展示的信息
      const product = {}
      product.image = this.swiperImgs[0]
      product.title = this.goodsInfo.title
      product.desc = this.detailInfo.desc
      product.price = this.goodsInfo.realPrice
      product.iid = this.iid
      product.count = 0
      product.checked = false
      console.log(product)
      //隐射调用
      this.addCartList(product).then(res => {
        console.log(res)

        this.$toast.show(res, 2000)
        // this.message = res
        // this.show = true
        //
        //
        // setTimeout(() => {
        //   this.show = false
        //   this.message = ''
        // }, 1500)
      })
      // this.$store.dispatch('addCartList', product).then(res => {
      //   console.log(res)
      // })


    }
  },

}
</script>

<style scoped>
.detail {
  position: relative;
  z-index: 100;
  background: #fff;
  height: 100vh;
}

.detail-nav {
  position: relative;
  z-index: 100;
  background: #ffffff;
}

.content {
  height: calc(100% - 44px - 49px);
}

.goods {
  margin-top: 10px;
}
</style>
