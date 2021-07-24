<template>
  <swiper>
      <swiper-item v-for ="item in banners" :key = "item.index">
        <a :href="item.link">
          <img :src="item.image" alt="" @load="imageLoad">
        </a>
      </swiper-item>
    </swiper>
</template>

<script>
import {Swiper,SwiperItem} from '../../../components/common/swiper/index'
export default {
  data(){
    return {
      isLoad:false
    }
  },
    props:{
        banners:{
            type:Array,
            defult(){
                return []
            }
        }
    },
    components: {
        Swiper,
        SwiperItem
    },
    methods: {
      imageLoad(){
        if(!this.isLoad){
          this.$emit('swiperImageLoad')
          this.isLoad = true
        }
      }
    }
}
</script>

<style>

</style>