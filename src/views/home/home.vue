<template>
  <div id="home">
    <!--  导航栏  -->
    <navbar class="home-nav">
      <div slot="center">购物街</div>
    </navbar>
    <!--    切换按钮 (伪)-->
    <tab-control :titles="titles" class="tab-control" @tabClick="requestKindData"
                 v-show="isTabFixed" ref="tabControl2"/>
    <!--    滑动组件-->
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
      <!--      切换按钮-->
      <tab-control :titles="titles" class="tab-control" @tabClick="requestKindData" ref="tabControl1"
                   v-show="!isTabFixed"
      />
      <!--      商品视图-->
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
import {backTopMixin} from "@/mixin/mixin";

export default {
  name: "home",
  components: {
    navbar,
    tabControl,
    goods,
    scroll,

    homeSwiper,
    HomeRecommend,
    homeFeature,

  },
  mixins: [backTopMixin],
  data() {
    return {
      banners: [],//轮播图数据
      recommend: [],//推荐视图数据
      titles: ['流行', '新款', '精选'],//切换按钮标题
      //商品数据
      goods: {
        'pop': {page: 0, list: []},
        'new': {page: 0, list: []},
        'sell': {page: 0, list: []}
      },
      kind: 'pop',//当前展示的商品类型
      detailIndex: 0,//禁止用户多次点击同一个类别按钮
      tabControlOffsetTop: 0,//类型悬浮按钮的位置
      isTabFixed: false,//类型悬浮按钮是显示
      detailCurrentIndex: 0,//当前展示的商品类型下标
      saveY: 0//组件离开时候的容器位置
    }
  },

  created() {
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
        //判断是替换数据还是增加数据 按钮为替换 上拉为增加
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
      //判断当前是否同一个按钮
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
      this.getHomeGoodsHandle(type, "replace")//带参数过去 本次为替换数据
      this.goods[type].list.splice(0, this.goods[type].list.length)//删除当前所有数据
      this.kind = type;//更改数据类别
      this.$refs.scroll.scrollTo(0, -this.tabControlOffsetTop, 500)//将容器置位正确位置
      this.detailIndex = index//保留当前类别的下标
      this.$refs.scroll.refresh()//数据已经渲染到 开始重新刷新容器高度
      this.$refs.tabControl1.currentIndex = index//更新正确的类别按钮
      this.$refs.tabControl2.currentIndex = index//此处也更新 此处是伪类 类别按钮
    },

    //将数据随机一下 防止每次拿到的数据展示时候都是一样的
    //洗牌函数
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


    //返回按钮隐藏显示
    contentScroll(position) {
      //1.返回顶部按钮是否显示
      this.backIsShow = (-position.y) > 1000

      //2.吸顶效果是否触发
      this.isTabFixed = (-position.y) > this.tabControlOffsetTop

    },

    //下拉加载更多
    pullingUp() {
      this.getHomeGoodsHandle(this.kind)
      this.$refs.scroll.refresh()
    },
    //由于图片是异步加载 当图片未加载完成时候 直接获取tabControl位置时候会有问题 此处是图片加载完毕的回调函数
    swiperImgLoadSuccess() {
      this.tabControlOffsetTop = this.$refs.tabControl1.$el.offsetTop
    }
  },
  mounted() {
    //监听goods组件中图片是否加载完毕 加载完毕重新计算高度
    //此处节流 防止重读调用 浪费性能
    const refresh = debounce(this.$refs.scroll.refresh, 300)
    this.$bus.$on("itemImageLoad", () => {
      refresh() //计算容器滑动高度
    })
  },
  //组件进来时候计算高度 并且将容器置位上次组件离开时候的位置
  activated() {
    this.$refs.scroll.refresh()
    this.$refs.scroll.scrollTo(0, -this.saveY, 0)
  },
  //保留组件离开时 容器的位置
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
