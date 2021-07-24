import Vue from 'vue'
import App from './App.vue'
import router from './router'
Vue.config.productionTip = false
Vue.prototype.$bus = new Vue()//创建一个vue实例作为事件总线
new Vue({
  render: h => h(App),
  router
}).$mount('#app')
