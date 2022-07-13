<template>
  <div class="profile">
    <navbar class="profile-navbar">
      <div slot="center">个人中心</div>
    </navbar>
    <div class="user-profile">
      <div>
        <img src="@/assets/img/profile/avatar.svg" alt="">
      </div>
      <div>
        <div style="font-size: 13px;color: #ffffff;margin-left: 5px">{{ $store.state.User[0].name }}</div>
        <div>
          <img src="@/assets/img/profile/phone.svg" alt="">
          <p style="font-size: 12px;color: #ffffff">暂无绑定手机</p>
        </div>
      </div>
      <div>
        <div @click="welfare" v-if="moneyBalance==0">点击领取见面礼</div>
      </div>
    </div>
    <div class="money">
      <div style="border-right: 1px solid #cccccc">
        <p>{{ moneyBalance }}</p>
        <p>我的余额</p>
      </div>
      <div style="border-right: 1px solid #cccccc">
        <p>0个</p>
        <p>我的优惠</p>
      </div>
      <div>
        <p>0分</p>
        <p>我的积分</p>
      </div>
    </div>
    <div class="button">
      <div @click="goCart">
        <img src="@/assets/img/profile/cart.svg" alt="">
        <p>我的购物车</p>
      </div>
      <div @click="bought">
        <img src="@/assets/img/profile/shopping.svg" alt="">
        <p>已购商品</p>
      </div>
      <div>
        <img src="@/assets/img/profile/message.svg" alt="">
        <p>我的消息</p>
      </div>
      <div>
        <img src="@/assets/img/profile/pointer.svg" alt="">
        <p>积分商城</p>
      </div>
      <div>
        <img src="@/assets/img/profile/vip.svg" alt="">
        <p>会员卡</p>
      </div>
    </div>
  </div>

</template>

<script>
import navbar from "@/components/common/navBar/navbar";
import {mapMutations, mapGetters} from "vuex"

export default {
  name: "profile",
  components: {
    navbar
  },
  methods: {
    ...mapMutations(['addUser', 'addMoney']),
    welfare() {
      this.addMoney(99999)
    },
    goCart() {
      this.$router.push("/cart")
    },
    bought() {
      this.$router.push("/bought")
    }
  },
  computed: {
    ...mapGetters(['moneyBalance'])
  },
  created() {
    if (!this.$store.state.User.length) {
      const user = {
        name: '测试账号',
        money: 0,
        boughtGoods: []
      }
      this.addUser(user)
    }
  }
}
</script>

<style scoped>
.profile {
  background: rgba(242, 242, 242);
}

.profile-navbar {
  background: var(--color-tint);
  color: #ffffff;
}

.user-profile {
  display: flex;
  padding: 10px 0;
  background: var(--color-tint);
}

.user-profile > div:nth-child(1) {
  flex: 3;
}

.user-profile > div:nth-child(1) {
  display: flex;
  justify-content: center;
  align-items: center;
}

.user-profile > div:nth-child(1) > img {
  width: 70px;
  height: 70px;
}

.user-profile > div:nth-child(2) {
  flex: 3;
  justify-content: center;
  display: flex;
  flex-direction: column;
}

.user-profile > div:nth-child(2) > div {
  display: flex;
  align-items: center;
}

.user-profile > div:nth-child(2) > div:nth-child(2) {
  margin-top: 5px;
}

.user-profile > div:nth-child(2) img {
  width: 20px;
  height: 20px;
}

.user-profile > div:nth-child(3) {
  flex: 3;
  display: flex;
  justify-content: center;
  align-items: center;
}

.user-profile > div:nth-child(3) > div {
  height: 80%;
  width: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  box-shadow: 2px 2px 5px 2px rgba(224, 106, 95, 0.638);
  color: white;
  font-size: 12px;
}

.money {
  padding: 10px 0;
  display: flex;
  background: white;
}

.money > div {
  flex: 1;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}

.money > div > p:nth-child(1) {
  font-size: 18px;
  font-weight: bold;
  color: rgba(224, 105, 95);
}

.button {
  background: white;
  margin-top: 20px;
}

.button > div {
  display: flex;
  font-size: 12px;
  color: var(--color-text);
  padding: 10px;
  border-bottom: 1px solid #cccccc;
  align-items: center;
}

.button > div > img {
  width: 20px;
  height: 20px;
  margin-right: 20px;
  margin-left: 10px;
}
</style>
