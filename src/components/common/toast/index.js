import Vue from 'vue'
import Toast from './Toast'
const obj = {}
obj.install = function(){
    const toastConstrustor = Vue.extend(Toast)//创建toast构造器
    const toast = new toastConstrustor()//使用构造器构造一个toast
    toast.$mount(document.createElement('div'))//手动创建一个div元素，并且将我们创建的toast挂载在div上面
    document.body.appendChild(toast.$el)
    Vue.prototype.$toast = toast//将我们创建好的toast添加到原型链上准备到后面使用
}
export default obj