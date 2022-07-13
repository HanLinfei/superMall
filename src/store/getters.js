export default {
  cartLength(state) {
    return state.cartList.length
  },
  cartList(state) {
    return state.cartList
  },
  cartBuyLength(state) {
    return state.cartList.filter(item => item.checked).length
  },
  cartBuyGoods(state) {
    let boughtGoods = []
    state.cartList.filter(item => {
      if (item.checked) {
        boughtGoods.push(item)
      }
    })
    return boughtGoods
  },
  moneyBalance(state) {
    return state.User[0].money.toFixed(2)
  },
  totalPrice(state) {
    return state.cartList.filter(item => item.checked).reduce((total, item) => {
      return total += item.price * item.count
    }, 0).toFixed(2)
  },

  boughtGoodsLength(state) {
    return state.User[0].boughtGoods.length
  },

  boughtList(state) {
    return state.User[0].boughtGoods
  }
}
