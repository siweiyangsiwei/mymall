<template>
  <div class="goods-item" @click = 'itemClick'>
      <img v-lazy="showImage" alt="" @load="imgLoad">
      <div class="goods-info">
          <p>{{goodsItem.title}}</p>
          <span class="price">{{goodsItem.price}}</span>
          <span class="collect">{{goodsItem.cfav}}</span>
      </div>
  </div>
</template>

<script>
export default {
    props:{
        goodsItem:{
            type:Object,
            default(){
                return {}
            }
        }
    },
    computed: {
      showImage(){//不同的页面中image的位置不同，使用计算属性来做一个判断
          return this.goodsItem.image || this.goodsItem.show.img
      }  
    },
    methods: {
        imgLoad(){
            this.$bus.$emit('itemImgLoad')//事件总线监听图片加载发射事件
            // if(this.$route.path.indexOf('/home')){
            //     this.$bus.$emit('homeItemImgLoad')
            // }else if(this.$route.path.indexOf('/detail')){
            //     this.$bus.$emit('detailItemImgLoad')
            // }通过路由的方式来判断在不同的页面发送这个图片加载完成的监听事件，解决在detail页面gooditem发生点击时home触发这个事件的bug
        },
        itemClick(){
            this.$router.push('/datail' + this.goodsItem.iid)
        }
    }
}
</script>

<style>
    .goods-item{
        padding-bottom: 40px;/*给下面的文字留空间 */
        position: relative;/*子绝父相 */
        width: 48%;
        height: 10px;
        background-color: aquamarine;
    }

    .goods-item img {
        width: 100%;
        border-radius:5px ;/*设置圆角 */
    }

    .goods-info{
        font-size: 12px;
        position: absolute;/*绝对定位 */
        bottom: 5px;
        left: 0px;
        right: 0px;
        overflow: hidden;
        text-align: center;/*居中 */
    }

    .goods-info p{
        overflow: hidden;
        text-overflow: ellipsis;/*文字过多的话显示... */
        white-space: nowrap;/*设置全部文字只显示在一行 */
        margin-bottom: 3px;
    }   

    .goods-info .price{
        color: var(--color-high-text);
        margin-right: 20px;/*右边空出空位留给星星 */
    }

    .goods-info .collect{
        position: relative;
    }

    .goods-info .collect::before{/*伪元素设置星星 */
        content: '';
        position: absolute;
        left: -15px;
        top: -1px;
        width: 14px;
        height: 14px;
        background: url('../../../assets/img/common/collect.svg') 0 0/14px 14px;
    }
</style>