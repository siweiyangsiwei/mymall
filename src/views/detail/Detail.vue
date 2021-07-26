<template>
  <div id="detail">
      <detail-nav-bar></detail-nav-bar>
      <detail-swiper @top-images = 'topImages'></detail-swiper>
      <detail-base-info></detail-base-info>
      <detail-shop-info></detail-shop-info>
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'

import {getDetail,Goods,Shop} from '../../network/detail'
export default {
    components: {
         DetailNavBar,
        DetailSwiper,
        DetailBaseInfo,
        DetailShopInfo
        
    },
    data(){
        return{
            iid:null,
            topImages:[],
            goods:null,
            shop:null,
        }
    },
    created(){
        this.iid = this.$route.params.iid//通过路由获取iid
        getDetail(this.iid).then(res => {
            console.log(res)
            const data = res.result
            // this.topImages = data.itemInfo.topImages获取轮播图中的图片
            // this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)通过类获取商品介绍栏中的数据
            // this.shop = new Shop(data.shopInfo)获取商家信息


        })
    }
}
</script>

<style>
</style>