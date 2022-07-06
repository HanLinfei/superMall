import {request, request1} from "@/network/request";

//首页数据请求

//请求轮播图和推荐
export function getHomeMultidata() {
  return request1({
    method: "get",
    url: "home/multidata"
  })
}

//请求商品
export function getHomeGoods(type, page) {
  return request({
    method: "get",
    url: `home/data`,
    params: {
      type,
      page
    }
  })
}
