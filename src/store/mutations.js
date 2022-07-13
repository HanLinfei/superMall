export default {
  // addCart(state, payload) {
  //
  //   //查找之前的购物车列表中是否有改商品
  //   let oldGood = state.cartList.find(item => item.iid === payload.iid)
  //   if (oldGood) {
  //     oldGood.count++
  //   } else { //没有该商品时候将此次商品数量置位1 并且push到购物车列表中
  //     payload.count++
  //     payload.checked = true
  //     state.cartList.push(payload)
  //   }
  //
  //
  // }

  addUser(state, payload) {
    state.User.push(payload)
    sessionStorage.setItem("user", JSON.stringify(state.User));//保存至本地浏览器缓存
  },
  addMoney(state, money) {
    state.User[0].money = money
    sessionStorage.setItem("user", JSON.stringify(state.User));//保存至本地浏览器缓存
  },
  subMoney(state, money) {
    state.User[0].money = money
    sessionStorage.setItem("user", JSON.stringify(state.User));//保存至本地浏览器缓存
  },

}
