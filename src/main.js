import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import FastClick from 'fastclick'
import vueLazyload from 'vue-lazyload'
import toast from './components/common/toast/index'

Vue.config.productionTip = false

Vue.prototype.$bus = new Vue()//创建一个vue实例作为事件总线

Vue.use(toast)

//解决移动端300毫秒的延迟
FastClick.attach(document.body)

Vue.use(vueLazyload,{
  loading:require('./assets/img/common/placeholder.png')
})
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')


