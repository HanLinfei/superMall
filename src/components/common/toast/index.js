import Toast from "@/components/common/toast/toast";

const obj = {}

//当我们使用插件时候 内部是来执行这个函数的
obj.install = function (Vue) {

  //1.创建组件构造器
  const toastContrustor = Vue.extend(Toast)

  //2.new的方式 根据组件构造器 可以创建一个组件对象
  const toast = new toastContrustor()

  //3.将组件对象手动挂载到一个元素上
  toast.$mount(document.createElement('div'))

  //4.toast.$el对应的就是div
  document.body.appendChild(toast.$el)
  Vue.prototype.$toast = toast


}

export default obj
