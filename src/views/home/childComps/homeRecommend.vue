<template>
  <div id="recommend">
    <ul>
      <li v-for="item in recommend">
        <a :href="item.link">
          <img :src="item.image" alt="">
        </a>
        <div>
          {{ item.title }}
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "homeRecommend",
  props: {
    recommend: {
      type: Array,
      default() {
        return [];
      }
    }
  }
}
</script>

<style scoped>
ul {
  display: flex;
  justify-content: center;
}

li {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}

a {
  display: flex;
  justify-content: center;
}

li img {
  width: 85%;
}

div {
  margin-top: 10px;
}

#recommend {
  border-bottom: 10px solid rgba(238, 238, 238);
}
</style>
