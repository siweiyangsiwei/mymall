<template>
  <div class="toast"  v-show="isShow">
      <div>{{message}}</div>
  </div>
</template>

<script>
export default {
    data(){
        return {
            message:'',
            isShow:false
        }
    },
    methods: {
        show(message = '默认信息', duration = 2000){
            this.isShow = true
            this.message = message
            setTimeout(() => {
                this.isShow = false
                this.message = ''
            }, duration);
        }
    }
}
</script>

<style>
    .toast{
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50% ,-50%);/*根据自身的长度和宽度来便宜一定的量 */
        color: #fff;
        background-color: rgba(0, 0, 0, .6);
        padding: 8px 10px ;
    }
</style>