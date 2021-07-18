import axios from 'axios'//引入axios模块
export function request(config){
    const instance = axios.create({//创建实例
        baseURL:'http://123.207.32.32:8000',
        timeout:5000
    })
    instance.interceptors.request.use(config => { //请求拦截的设置
        return config
    },err => {
        console.log(err)
    })
    instance.interceptors.response.use(res => {//响应拦截的设置
        return res.data
    },err => {
        console.log(err)
    })
    return instance(config)//发送真正的网络请求
}
