export default {
  cartLength(state) {
    return state.cartList.length
  },
  cartList(state) {
    return state.cartList
  },
  cartBuyLength(state) {
    return state.cartList.filter(item => item.checked).length
  }
}
