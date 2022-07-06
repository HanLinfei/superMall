<template>
  <div>
    <detail-nav-bar/>
    <detail-swiper :swiperImgs="swiperImgs"/>
    <detail-goods :goods="goodsInfo"/>
    <detail-shop-info :shopInfo="shopInfo"/>
  </div>
</template>

<script>
//业务组件
import detailNavBar from "@/detail/childComps/DetailNavBar";
import detailSwiper from "@/detail/childComps/DetailSwiper";
import detailGoods from "@/detail/childComps/DetailGoods";
import detailShopInfo from "@/detail/childComps/DetailShopInfo";

//数据请求
import {getDetail, shop, goodsInfo} from "@/network/detail";

export default {
  name: "detail",
  components: {
    detailNavBar,
    detailSwiper,
    detailGoods,
    detailShopInfo
  },
  data() {
    return {
      iid: null,
      swiperImgs: [],
      goodsInfo: {},
      shopInfo: {}
    }
  },
  created() {
    this.iid = this.$route.params.iid

    //请求详情页数据
    this.responseDetail(this.iid)
  },
  methods: {
    //响应详情页数据
    responseDetail(iid) {
      getDetail(iid).then(({data: {result}}) => {
        console.log(result)
        //轮播图信息
        this.swiperImgs.push(...result.itemInfo.topImages)
        //商品信息
        this.goodsInfo = new goodsInfo(
          result.itemInfo,
          result.columns,
          result.shopInfo.services
        )
        //商家信息
        this.shopInfo = new shop(result.shopInfo)

        console.log(this.shopInfo)
      })
    }
  }
}
</script>

<style scoped>

</style>
