<template>
  <div class="comment">
    <div v-if="userComments.list">
      <div class="title" v-if="userComments.cRate!==''">
        <p>用户评价</p>
        <p>更多({{ userComments.cRate }})</p>
      </div>
      <div class="comment-content">
        <div class="user">
          <img :src="userComments.list[0].user.avatar" alt="">
          <p class="userId">{{ hideUser }}</p>
        </div>
        <div class="content">
          <p>{{ userComments.list[0].content }}</p>
        </div>
        <div class="comment-time">
          <p>{{ timeFormat(userComments.list[0].created, "yyyy-mm-dd") }}</p>
          <p>{{ userComments.list[0].style }}</p>
        </div>
        <div class="comment-img" v-if="userComments.list[0].images">
          <img :src="item" alt="" v-for="item in userComments.list[0].images">
        </div>
      </div>
    </div>
    <div v-else>
      <div class="title" v-if="userComments.cRate!==''">
        <p>用户评价</p>
        <p>更多(0)</p>
      </div>
      <div class="content">
        <p style="font-size: 13px;color: var(--color-text);margin-top: 5px">还没有人购买该商品，快购买该商品参与评价吧~</p>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: "DetailComment",
  props: {
    userComments: {
      type: Object,
      default() {
        return {}
      }
    },
  },
  computed: {
    //将用户名匿名
    hideUser() {
      let userName = this.userComments.list[0].user.uname
      return userName.substring(0, 1) + new Array(userName.length - 1).join("*") + userName.substring(userName.length - 1)
    },
    //格式化时间
    timeFormat() {
      return function (val, str) {
        const dt = new Date(val * 1000);
        const year = (dt.getFullYear() + "").padStart(2, "0");
        const month = (dt.getMonth() + 1 + "").padStart(2, "0");
        const date = (dt.getDate() + "").padStart(2, "0");
        const hours = (dt.getHours() + "").padStart(2, "0");
        const minutes = (dt.getMinutes() + "").padStart(2, "0");
        const seconds = (dt.getSeconds() + "").padStart(2, "0");
        if (str == "yyyy-mm-dd") {
          return `${year}-${month}-${date}`;
        } else {
          return `${year}-${month}-${date}-${hours}:${minutes}:${seconds}`;
        }
      };
    },
  }
}
</script>

<style scoped>
.comment {
  margin: 8px 0 12px 0;
  padding: 0 6px;
}

.title {
  padding: 5px 0;
  font-size: 12px;
  display: flex;
  justify-content: space-between;
  color: var(--color-text);
  font-weight: bold;
  border-bottom: 1px solid #ccc;
}

.comment-content {
  margin-top: 10px;
}

.comment-content > .user {
  display: flex;
  font-size: 13px;
  align-items: center;
}

.comment-content > .user > img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 5px;
}

.comment-content > .content {
  margin-top: 8px;
  font-size: 12px;
}

.comment-time {
  margin-top: 8px;
  display: flex;
}

.comment-time > p {
  color: var(--color-text);
  font-size: 11px;
  margin-right: 8px;
}

.comment-img {
  margin-top: 10px;
}

.comment-img img {
  width: 20%;
  margin-right: 1%;
}
</style>
