<template>
  <div class="category">
    <navbar class="category-navbar">
      <div slot="center">商品分类</div>
    </navbar>
    <div class="category-box">
      <div class="category-type">
        <ul>
          <li class="type-item" @click="cutType(index)" :class="{activeType:currentIndex===index}"
              v-for="(item,index) in typeList"
              :key="index">{{ item.title }}
          </li>
        </ul>
      </div>
      <div class="category-content">
        <scroll class="content" ref="scroll">
          <ul>
            <li v-for="item in contentList">
              <a :href="item.link"><img :src="item.image" alt="" @load="imgLoad"></a>
              <p>{{ item.title }}</p>
            </li>
          </ul>
        </scroll>
      </div>
    </div>
  </div>
</template>

<script>
import navbar from "@/components/common/navBar/navbar";
import scroll from "@/components/common/scroll/scroll";
import goods from "@/components/content/goods/goods";
import {getCategoryType, getCategoryContent, getCategoryDetail} from "@/network/category";

export default {
  name: "cartegory",
  components: {
    navbar,
    scroll,
    goods,
  },
  data() {
    return {
      typeList: [],
      currentIndex: 0,
      contentList: [],
      detailGoods: []
    }
  },

  created() {
    //请求分类数据
    this.handleCategoryType()
  },
  methods: {
    handleCategoryType() {
      getCategoryType().then(({data: {data: {category}}}) => {
        this.typeList = category.list
        console.log(this.typeList)
        //展示类别内容
        this.handleCategoryContent(this.typeList[this.currentIndex].maitKey)
        //展示类别推荐商品
        this.hadleCategoryDetail(this.typeList[this.currentIndex].miniWallkey)
      })
    },
    //类别
    handleCategoryContent(typeId) {
      getCategoryContent(typeId).then(({data}) => {
        this.contentList = data.data.list
        console.log(this.contentList)
      })
    },

    //推荐商品
    hadleCategoryDetail(detailId) {
      getCategoryDetail(detailId).then(({data}) => {
        console.log(data)
        const arr = []
        data.forEach(item => {
          let obj = {
            src: item.img,
            // href: item.link,
            title: item.title,
            price: item.price,
            cfav: item.cfav,
            iid: item.iid
          }
          arr.push(obj)
        })
        this.detailGoods = arr
      })
    },

    //监听类型切换
    cutType(index) {
      this.currentIndex = index
      this.handleCategoryContent(this.typeList[this.currentIndex].maitKey)
    },

    //图片加载完毕后来刷新scroll高度
    imgLoad() {
      this.$refs.scroll.refresh()
    },
    goodsLoad() {
      this.$refs.scroll.refresh()
    }
  }
}
</script>

<style scoped>

.content {
  height: 100%;
}

.category {
  height: 100vh;
}

.category-navbar {
  background: #ff8198;
  color: #ffffff;
}

.category-box {
  height: calc(100% - 44px - 49px);
  display: flex;
  justify-content: center;
}

.category-type {
  flex: 4;
  display: flex;
  height: 100%;
  justify-content: center;
  background: #f7f5f7;
}

.category-type > ul {
  flex: 1;
  color: var(--color-text);
}

.category-type li {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 0;
  font-size: 13px;

}


.category-content {
  flex: 8;
  height: 100%;
  overflow: hidden;
}

.category-content ul {
  padding: 0 10px 10px 10px;
  display: flex;
  flex-wrap: wrap;
}

.category-content ul > li {
  flex: 0 0 33.33333%;
  font-size: 12px;
  padding-top: 10px;
  color: var(--color-text);
  display: flex;
  align-items: center;
  flex-direction: column;
}

.category-content ul > li img {
  width: 90%;
}

.category-content li p {
  margin-top: 8px;
}

.activeType {
  background: #ffffff;
  color: var(--color-tint);
  font-weight: bold;
  border-left: 5px solid var(--color-high-text);
}

.category-goods img {

}
</style>
