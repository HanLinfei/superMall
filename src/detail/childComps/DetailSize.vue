<template>
  <div class="table-sizes" v-if="Object.keys(sizes).length !== 0">
    <div class="top">
      <p class="title">尺码说明</p>
      <table>
        <tbody>
        <tr v-for="item in sizes.sizes[0]">
          <td v-for="item in item">
            {{ item }}
          </td>
        </tr>
        </tbody>
      </table>
      <p class="small"> ※ 以上尺寸为实物人工测量，因测量当时不同会有1-2cm误差，相关数据仅作参考，以收到实物为准。 </p>
    </div>
    <div class="bottom">
      <p class="title">参数列表</p>
      <table>
        <tbody>
        <tr v-for="item in sizes.infos">
          <td>{{ item.key }}</td>
          <td>{{ item.value }}</td>
        </tr>
        </tbody>
      </table>
    </div>
    <div class="size-img" v-if="sizes.image!=='' ">
      <img :src="sizes.image" alt="">
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailSize",
  props: {
    sizes: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>

<style scoped>
.table-sizes {
  padding: 0 6px;
  border-top: 2px solid whitesmoke;
}

.title {
  margin-top: 8px;
  font-size: 15px;
  font-weight: bold;
  color: var(--color-text);
}

.top > table {
  width: 100%;
  font-size: 13px;
  color: var(--color-text);
  border-collapse: collapse;
}

.top > table tr {
  padding: 7px 0;
  height: 30px;
  border-bottom: 1px solid #ccc;
}

.small {
  margin: 12px 0;
  font-size: 12px;
  color: var(--color-text);
}

.bottom > table {
  border-collapse: collapse;
  width: 100%;
  font-size: 13px;
}

.bottom > table > tbody > tr > td:nth-child(1) {
  width: 30%;
}

.bottom > table > tbody > tr > td:nth-child(2) {
  color: var(--color-tint);
}

.bottom > table tr {
  padding: 7px 0;
  height: 30px;
  border-bottom: 1px solid whitesmoke;
}
</style>
