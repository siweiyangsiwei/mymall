<template>
  <div class="wrapper" ref='wrapper'>
      <div class="content">
        <slot></slot>
      </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
     props:{
        probeType:{//动态绑定probetype通过使用这个组件的时候传过来的参数来决定
            type:Number,
            default:0
        },
        pullUpLoad:{
            type:Boolean,
            default:false,
        }
    },
    data () {
        return {
            scroll:null
        }
    },
    mounted(){
        this.scroll = new BScroll(this.$refs.wrapper,{
            probeType:this.probeType,
            click:true,
            pullUpLoad:this.pullUpLoad
        })
        // this.scroll.scrollTo(0,0)
        this.scroll.on('scroll',(pos) => {
            this.$emit('scroll',pos)
        })
        this.scroll.on('pullingUp',() => {
            this.$emit('pullingUp')
            // this.scroll.finishPullUp()
        })

    },
   
    methods: {
        scrollTo(x,y,time=500){
            this.scroll && this.scroll.scrollTo(x,y,time)
        },
        finishPullUp(){
            this.scroll.finishPullUp()
        },
        refresh(){
            this.scroll && this.scroll.refresh()//这里加一个与判断可以解决在没有挂载上的时候就不会调用这个函数，也就不会报错了
        }
    }
}
</script>

<style>

</style>