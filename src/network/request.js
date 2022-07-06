import axios from "axios"

//封装axios

export function request1(config) {
  const instance = axios.create({
    baseURL: "http://152.136.185.210:7878/api/hy66", //根
    timeout: 2000 //请求超时毫秒
  })
  //请求拦截
  instance.interceptors.request.use(config => {
    return config
  }, err => {

  })


  //响应拦截
  instance.interceptors.response.use(res => {
      return res
    }
  )
  return instance(config)
}


export function request(config) {
  const instance = axios.create({
    baseURL: "http://152.136.185.210:7878/api/hy66", //根
    timeout: 2000 //请求超时毫秒
  })
  //请求拦截
  instance.interceptors.request.use(config => {
    return config
  }, err => {

  })


  //响应拦截
  instance.interceptors.response.use(res => {
    // console.log(res.data.data.list)
    const arr = []
    res.data.data.list.forEach(item => {
      const obj = {
        src: item.show.img,
        // href: item.link,
        title: item.title,
        price: item.price,
        cfav: item.cfav,
        iid: item.iid
      }
      arr.push(obj)
    })
    return arr
  }, err => {

  })
  //返回Promise
  return instance(config)
}
