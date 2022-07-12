export default {
  addCartList({state}, payload) {
    return new Promise((resolve, reject) => {
      //查找之前的购物车列表中是否有改商品
      let oldGood = state.cartList.find(item => item.iid === payload.iid)
      if (oldGood) {
        oldGood.count++
        sessionStorage.setItem("cartList", JSON.stringify(state.cartList));
        resolve("当前商品数量+1")
      } else { //没有该商品时候将此次商品数量置位1 并且push到购物车列表中
        payload.count++
        payload.checked = true
        state.cartList.push(payload)
        sessionStorage.setItem("cartList", JSON.stringify(state.cartList));
        resolve("添加了新的商品")
      }
    })
  }
}
