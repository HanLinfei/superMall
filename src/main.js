import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import toast from "@/components/common/toast";
import Fastclick from "fastclick"
import VueLazyLoad from "vue-lazyload"

Vue.config.productionTip = false
//添加事件总线对象
Vue.prototype.$bus = new Vue()

//安装toast插件
Vue.use(toast)
Vue.use(VueLazyLoad)//路由懒加载 直接把图片src替换掉v-lazy
Fastclick.attach(document.body)//解决与移动端单击300ms延迟的问题
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')//相当于el的作用
