<template>
  <!--  <div id="home">-->
  <!--    &lt;!&ndash;  导航栏  &ndash;&gt;-->
  <!--    <navbar class="home-nav">-->
  <!--      <div slot="center">购物街</div>-->
  <!--    </navbar>-->
  <!--    &lt;!&ndash;    轮播图&ndash;&gt;-->
  <!--    <home-swiper :banners="banners" class="home-swiper"/>-->
  <!--    &lt;!&ndash;    推荐视图&ndash;&gt;-->
  <!--    <HomeRecommend :recommend="recommend"/>-->
  <!--    &lt;!&ndash;    特征视图&ndash;&gt;-->
  <!--    <home-feature/>-->
  <!--    &lt;!&ndash;    切换按钮&ndash;&gt;-->
  <!--    <tab-control :titles="titles" class="tab-control" @tabClick="requestKindData"/>-->
  <!--    <goods :goods="goods[kind].list" ref="goods" :class="{showgoods:isShow}" :style="{height: height+'px'}"></goods>-->
  <!--  </div>-->

  <div id="home">
    <!--  导航栏  -->
    <navbar class="home-nav">
      <div slot="center">购物街</div>
    </navbar>
    <!--    切换按钮-->
    <tab-control :titles="titles" class="tab-control" @tabClick="requestKindData"
                 v-show="isTabFixed" ref="tabControl2"/>
    <scroll class="content" ref="scroll" :probe-type="3"
            :pull-up-load="true"
            @scroll="contentScroll"
            @pullingUp="pullingUp">
      <!--    轮播图-->
      <home-swiper :banners="banners" class="home-swiper" v-if="banners !== '' "
                   @swiperImgLoadSuccess="swiperImgLoadSuccess"/>
      <!--    推荐视图-->
      <HomeRecommend :recommend="recommend" v-if="recommend !== '' "/>
      <!--    特征视图-->
      <home-feature/>
      <tab-control :titles="titles" class="tab-control" @tabClick="requestKindData" ref="tabControl1"
                   v-show="!isTabFixed"
      />
      <goods :goods="goods[kind].list" ref="goods" v-if="goods[kind].list !=='' " class="goods"
      ></goods>

    </scroll>
    <back-top @click.native="backTop" v-show="backIsShow"/>
  </div>
</template>

<script>
//公共组件
import navbar from "@/components/common/navBar/navbar";
import tabControl from "@/components/content/tabControl";
import goods from "@/components/content/goods/goods";
import scroll from "@/components/common/scroll/scroll";
import backTop from "@/components/content/backTop";
//业务组件
import homeSwiper from "@/views/home/childComps/homeSwiper";
import HomeRecommend from "@/views/home/childComps/homeRecommend";
import homeFeature from "@/views/home/childComps/homeFeature";

//工具函数
import {getHomeMultidata, getHomeGoods} from "@/network/home";
import debounce from "@/tool/debounce";

export default {
  name: "home",
  components: {
    navbar,
    tabControl,
    goods,
    scroll,
    backTop,

    homeSwiper,
    HomeRecommend,
    homeFeature,

  },
  data() {
    return {
      banners: [],//轮播图
      recommend: [],//推荐视图
      titles: ['流行', '新款', '精选'],//切换按钮
      goods: {
        'pop': {page: 0, list: []},
        'new': {page: 0, list: []},
        'sell': {page: 0, list: []}
      },
      kind: 'pop',
      backIsShow: false,
      detailIndex: 0,
      tabControlOffsetTop: 0,
      isTabFixed: false,
      detailCurrentIndex: 0,
      saveY: 0
    }
  },

  created() {
    this.isShow = true
    //1.请求首页数据
    getHomeMultidata().then(res => {
      this.banners = res.data.data.banner.list
      this.recommend = res.data.data.recommend.list
    }).catch(err => {
      console.log(err)
    })
    //2.请求商品数据
    this.getHomeGoodsHandle("pop")
    this.getHomeGoodsHandle("new")
    this.getHomeGoodsHandle("sell")


  },

  methods: {
    //根据类型发送查询
    getHomeGoodsHandle(type, replace) {
      const page = this.goods[type].page + 1
      getHomeGoods(type, page).then(res => {
        //随机排序
        let arr = this.shuffle(res)
        if (replace === "replace") {
          this.goods[type].list.push(...arr)
        } else {
          this.goods[type].list.push(...arr)
          this.goods[type].page += 1
        }

      }).catch(err => {
        console.log(err)
      })
    },
    //分类切换按钮
    requestKindData(index) {
      if (this.detailIndex !== index) {
        switch (index) {
          case 0 :
            this.currentDetail(index, "pop")
            break
          case 1 :
            this.currentDetail(index, "new")
            break
          case 2 :
            this.currentDetail(index, "sell")
            break
        }
      }
    },
    //切换按钮
    currentDetail(index, type) {
      this.getHomeGoodsHandle(type, "replace")
      this.goods[type].list.splice(0, this.goods[type].list.length)
      this.kind = type;
      this.$refs.scroll.scrollTo(0, -this.tabControlOffsetTop)
      this.detailIndex = index
      this.$refs.scroll.refresh()
      this.$refs.tabControl1.currentIndex = index
      this.$refs.tabControl2.currentIndex = index
    },

    //将数据随机一下 防止每次拿到的数据展示时候都是一样的
    shuffle(arr) {
      let arrLength = arr.length
      let randomIndex = null
      let temp = null
      while (arrLength > 0) {
        randomIndex = Math.floor(Math.random() * arrLength)
        temp = arr[arrLength - 1]
        arr[arrLength - 1] = arr[randomIndex]
        arr[randomIndex] = temp
        arrLength--
      }
      return arr
    },

    //回到顶部
    backTop() {
      this.$refs.scroll.scrollTo(0, 0, 600)
    },

    //返回按钮隐藏显示
    contentScroll(position) {
      //1.返回顶部按钮是否显示
      this.backIsShow = (-position.y) > 1000

      //2.吸顶效果是否触发
      this.isTabFixed = (-position.y) > this.tabControlOffsetTop


    },

    //加载更多
    pullingUp() {
      this.getHomeGoodsHandle(this.kind)
    },

    //监听tabControl监听是否加载完毕
    swiperImgLoadSuccess() {
      this.tabControlOffsetTop = this.$refs.tabControl1.$el.offsetTop
      this.detailTop = this.$refs.tabControl1.$el.offsetTop
      console.log(this.tabControlOffsetTop)
    }

  },
  mounted() {
    //监听goods组件中图片是否加载完毕
    const refresh = debounce(this.$refs.scroll.refresh, 300)
    this.$bus.$on("itemImageLoad", () => {
      refresh()
    })

  },

  activated() {
    this.$refs.scroll.scrollTo(0, -this.saveY)
    this.$refs.scroll.refresh()
  },
  deactivated() {
    this.saveY = -this.$refs.scroll.scroll.y  //当前容器的Y轴位置
  }
}
</script>

<style scoped>
/*第一种方案 动态计算*/
#home {
  height: 100vh;
  /*padding-top: 44px;*/
}

.content {
  position: relative;
  height: calc(100% - 49px);
  overflow: hidden;
}

/*第二种方案 定位拉伸 */
/*#home {*/
/*  height: 100vh;*/
/*  padding-top: 44px;*/
/*  position: relative;*/
/*}*/

/*.content {*/
/*  position: absolute;*/
/*  top: 44px;*/
/*  bottom: 49px;*/
/*  overflow: hidden;*/
/*}*/

.home-nav {
  background: var(--color-tint);
  color: white;
  /*原生滚动的定位*/
  /*position: fixed;*/
  /*top: 0;*/
  /*left: 0;*/
  /*right: 0;*/
  z-index: 100;
}


.tab-control {
  /*  当没有达到我们给定的位置时候 此时定位还是sticky 当达到给定的位置时 浏览器就会自动更爱定位方式为 fixed */
  position: relative;
  background: white;
}


</style>
