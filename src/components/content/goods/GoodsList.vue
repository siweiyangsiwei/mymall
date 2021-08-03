<template>
  <div class="goods">
      <button @click = 'btnClick'>按钮</button>
      <goods-list-item v-for="item in goods" :key="item.index" :goodsItem = 'item'></goods-list-item>

  </div>
</template>

<script>
import GoodsListItem from './GoodsListItem'
export default {
    components: {
      GoodsListItem,  
    },
    props:{
        goods:{
            type:Array,
            default(){
                return []
            }
        }
    },
    methods: {
        btnClick(){
            this.$toast.show('显示button的内容')
        }
    }
}
</script>

<style>
    .goods{
        height: 10000px;
        display: flex;/*这个会将所有的元素都塞在一行里面 */
        background-color: aqua;
        flex-wrap: wrap;/*设置这个就会根据每个元素的大小来分配多少行 */
        justify-content: space-around;/*将元素的空白地方均等分 */
    }
</style>