import {request, requestRule} from "@/network/request";


//请求类别
export function getCategoryType() {
  return request({
    url: "/category",
  })
}


//根据类别ID请求推荐类别
export function getCategoryContent(maitKey) {
  return request({
    url: "/subcategory",
    params: {
      maitKey
    }
  })
}

//根据类别ID请求推荐商品
export function getCategoryDetail(miniWallkey) {
  return request({
    url: "/subcategory/detail",
    params: {
      miniWallkey
    }
  })
}
