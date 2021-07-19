<template>
  <div class="tab-control">
      <div v-for="(item,index) in titles" 
      :key="item.index"  
      class="tab-control-item" 
      :class="{active:index===currentIndex}"  
      @click="itemClick(index)">
          <span>{{item}}</span>
      </div>
  </div>
</template>

<script>
export default {
    props:{
        titles:{
            type:Array,
            default(){
                return []
            }
        }
    },
    data(){
        return {
            currentIndex:0
        }
    },
    methods: {
        itemClick(index){//点击事件的函数
            this.currentIndex = index
            this.$emit('tabClick',index)//子组件向外面传递事件使用自定义事件
        }
    }
}
</script>

<style>
    .tab-control{
    display: flex;
    text-align: center;
    font-size: 15px;
    height: 40px;
    line-height: 40px;
    background-color: white;
 }
    .tab-control-item{
        flex: 1;
        
    }
    .active{/*活跃状态的类 */
        color: var(--color-high-text);
    }
    .active span{
        border-bottom: 3px solid var(--color-tint);
        padding: 2px;

    }
</style>