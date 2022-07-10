<template>
  <div class="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick"/>
    <scroll class="content" :pull-up-load="true" ref="scroll">
      <detail-swiper :swiperImgs="swiperImgs"/>
      <detail-goods :goods="goodsInfo"/>
      <detail-shop-info :shopInfo="shopInfo"/>
      <detail-info :detailInfo="detailInfo" @imgLoad="DebounceimgLoad" @SuccessRenderImg="SuccessRenderImg" ref="info"/>
      <detail-size :sizes="sizes" ref="size"/>
      <detail-comment :userComments="userComments" ref="comment"/>
      <goods :goods="goods" @imgLoad="SuccessRenderImg" class="goods" ref="goods"/>
    </scroll>
    <detail-bottom-bar/>
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
    scroll
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
      themeTopY: []
    }
  },
  created() {
    //获得当前活跃路由的IID
    this.iid = this.$route.query.iid

    //请求详情页数据
    this.responseDetail(this.iid)

    //请求推荐商品
    this.getRecommendGoods()

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
        console.log(result)
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
          // console.log('全部加载完毕')
        })
      }
    },


    titleClick(index) {
      console.log(index)
      this.$refs.scroll.scrollTo(0, -this.themeTopY[index], 300)
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
