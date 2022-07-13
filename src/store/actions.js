export default {
  addCartList({state}, payload) {
    return new Promise((resolve, reject) => {
      //查找之前的购物车列表中是否有改商品
      let oldGood = state.cartList.find(item => item.iid === payload.iid)
      if (oldGood) {
        oldGood.count++
        sessionStorage.setItem("cartList", JSON.stringify(state.cartList));//保存至本地浏览器缓存
        resolve("当前商品数量+1")
      } else { //没有该商品时候将此次商品数量置位1 并且push到购物车列表中
        payload.count++
        payload.checked = true
        state.cartList.push(payload)
        sessionStorage.setItem("cartList", JSON.stringify(state.cartList));
        resolve("添加了新的商品")
      }
    })
  },
  Buy({state, getters, mutations}, payload) {
    return new Promise((resolve, reject) => {
      let balance = getters.moneyBalance - getters.totalPrice
      if (balance < 0) {
        reject("余额不足")
      } else {
        state.User[0].money = balance

        getters.cartBuyGoods.forEach((item, index) => {
          state.User[0].boughtGoods.push(item)
          state.cartList.splice(state.cartList.indexOf(item), 1)
        })

        sessionStorage.setItem("user", JSON.stringify(state.User));//保存至本地浏览器缓存
        sessionStorage.setItem("cartList", JSON.stringify(state.cartList));
        resolve("购买成功,请在已购商品中查看")
      }

    })
  }
}
