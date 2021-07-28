import {debounce} from './utils'
export const itemListenerMixin = {
    data(){//将变量放入到混入当中也可以
        return {
            itemImglistener:null
        }
    },
    mounted(){
        this.itemImglistener = () => {//定义这个刷新的函数，以便在后面离开这个页面时取消这个监听
            refresh()
        }
        const refresh = debounce(this.$refs.scroll.refresh,50)//防抖动函数，500毫秒之后就调用一次
        this.$bus.$on('itemImgLoad', this.itemImglistener)//图片加载完成的事件监听
    }
}