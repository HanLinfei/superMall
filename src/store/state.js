export default {
  cartList: JSON.parse(sessionStorage.getItem("cartList")) || [],
  User: JSON.parse(sessionStorage.getItem("user")) || [],
}
