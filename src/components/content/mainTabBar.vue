<template>
  <tab-bar>
    <tab-bar-item path="/home" active-color="#ff5777">
      <img src="@/assets/img/tabbar/home.svg" alt="" slot="item-icon"/>
      <img
        src="@/assets/img/tabbar/home_active.svg"
        slot="item-icon-active"
        alt=""
      />
      <div slot="item-text">首页</div>
    </tab-bar-item>
    <tab-bar-item path="/category" active-color="#ff5777">
      <img src="@/assets/img/tabbar/category.svg" alt="" slot="item-icon"/>
      <img
        src="@/assets/img/tabbar/category_active.svg"
        slot="item-icon-active"
        alt=""
      />
      <div slot="item-text">分类</div>
    </tab-bar-item>
    <tab-bar-item path="/cart" active-color="#ff5777">
      <img src="@/assets/img/tabbar/cart.svg" alt="" slot="item-icon"/>
      <img
        src="@/assets/img/tabbar/cart_active.svg"
        slot="item-icon-active"
        alt=""
      />
      <div slot="item-text">购物车</div>
    </tab-bar-item>
    <tab-bar-item path="profile" active-color="#ff5777">
      <img src="@/assets/img/tabbar/profile.svg" alt="" slot="item-icon"/>
      <img
        src="@/assets/img/tabbar/profile_active.svg"
        slot="item-icon-active"
        alt=""
      />
      <div slot="item-text">我的</div>
    </tab-bar-item>
  </tab-bar>
</template>

<script>
import tabBar from "@/components/common/tabBar/tabBar";
import tabBarItem from "@/components/common/tabBar/tabBarItem";

export default {
  name: "mainTabBar",
  components: {
    tabBar,
    tabBarItem,
  },
};
</script>

<style scoped></style>
