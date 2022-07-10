import {request, request1} from "@/network/request";

export function getDetail(iid) {
  return request1({
    url: "/detail",
    params: {
      iid,
    }
  })
}

export class goodsInfo {
  constructor(itemInfo, columns, services) {
    this.desc = itemInfo.desc;
    this.title = itemInfo.title;
    this.iid = itemInfo.iid;
    this.newPrice = itemInfo.price;
    this.oldPrice = itemInfo.oldPrice;
    this.realPrice = itemInfo.lowNowPrice;
    this.discount = itemInfo.discountDesc;
    this.discountBgColor = itemInfo.discountBgColor;
    this.columns = columns;
    this.services = services;
  }
}


export class shop {
  constructor(showInfo) {
    this.logo = showInfo.shopLogo
    this.name = showInfo.name
    this.fans = showInfo.cFans
    this.sells = showInfo.cSells
    this.score = showInfo.score
    this.goodsCount = showInfo.cGoods
  }
}

export class goodsParam {
  constructor(info, rule) {
    this.image = info.images ? info.images[0] : ''
    this.infos = info.set
    this.sizes = rule.tables
  }
}

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
