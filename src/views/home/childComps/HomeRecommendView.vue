<template>
  <div class="recommend">
      <div v-for="item in recommends" :key="item.index" class="recommend-item">
          <a :href="item.link">
              <img :src="item.image" alt="">
              <div>{{item.title}}</div>
          </a>
      </div>
  </div>
</template>

<script>
export default {
    props:{//向子组件传递数据
        recommends:{
            type:Array,
            default(){
                return []
            }
        }
    }
}
</script>

<style>
    .recommend{
        display: flex;
        width: 100%;
        text-align: center;
        font-size: 12px;
        padding: 10px 0 20px;
        border-bottom:10px solid #eee
    }
    .recommend-item{
        flex: 1;/*均等分 */
    }
    .recommend-item img{/*设置图片大小 */
        width: 70px;
        height: 70px;
    }
</style>