<template>
   <div class="tab-bar-items" @click = 'itemClick'>
       <div  v-if = "!isActive">
      <slot name="item-icon"></slot>
       </div>
       <div v-else >
      <slot name="item-active"></slot>
       </div>
      <div :class="{active:isActive}"><slot name="item-text"></slot></div>
   </div>
</template>

<script>
export default {
    props:{
        path:String
    },
    data(){
        return {
            // isActive:false,
        }
    },
    computed: {
      isActive(){
          return this.$route.path.indexOf(this.path) !==-1
      }  
    },
    methods: {
        itemClick(){
            this.$router.replace(this.path)
        }
    }
}
</script>

<style>
    .tab-bar-items{
    flex: 1;
    text-align: center;
    height: 49px;
    font-size: 14px;
}
    .tab-bar-items img{
        height: 24px;
        width: 24px;
        margin-top: 3px;
        vertical-align: middle;
        margin-bottom: 2px;
    }
    .active{
        color: red;
    }
</style>