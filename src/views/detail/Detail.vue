<template>
  <div id="detail">
      <detail-nav-bar></detail-nav-bar>
      <detail-swiper @top-images = 'topImages'></detail-swiper>
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import {getDetail} from '../../network/detail'
export default {
    components: {
      DetailNavBar,
      DetailSwiper
    },
    data(){
        return{
            iid:null,
            topImages:[]
        }
    },
    created(){
        this.iid = this.$route.params.iid//通过路由获取iid
        getDetail(this.iid).then(res => {
            console.log(res)
            // this.topImages = res.result.itemInfo.topImages
        })
    }
}
</script>

<style>
</style>