<template>
  <div id="detail">
      <detail-nav-bar class="detail-nav"></detail-nav-bar>
      <scroll class="content" ref="scroll">
        <detail-swiper :top-images = 'topImages'></detail-swiper>
        <detail-base-info :goods = 'goods'></detail-base-info>
        <detail-shop-info :shop = 'shop'></detail-shop-info>
        <detail-goods-info :detail-info = 'detailInfo' @imgLoad = 'imgLoad'></detail-goods-info>
        <detail-param-info :paramInfo="paramsInfo"></detail-param-info>
        <detail-comment-info :commentInfo = 'commentInfo'></detail-comment-info>
      </scroll>
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'


import Scroll from '../../components/common/scroll/Scroll'

import {getDetail,Goods,Shop,GoodsParam} from '../../network/detail'
export default {
    components: {
        DetailNavBar,
        DetailSwiper,
        DetailBaseInfo,
        DetailShopInfo,
        Scroll,
        DetailGoodsInfo,
        DetailParamInfo,
        DetailCommentInfo
        
    },
    data(){
        return{
            iid:null,
            topImages:[],
            goods:{},
            shop:{},
            detailInfo:{},
            paramsInfo:{},
            commentInfo:{}
        }
    },
    methods: {
    imgLoad(){
        this.$refs.scroll.refresh()
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
            // this.detailInfo = data.detailInfo
            // this.paramsInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)获取商品的详细数据
            // if(data.rate.cRate !== 0){获取评论信息
            //     this.commenInfo = data.rate.list[0]
            // }
        })
    }
}
</script>

<style>
    #detail{
        position:relative;
        z-index: 9;
        background-color: white;
        height: 100vh;
    }
    .detail-nav{
        position:relative;
        z-index: 9;
        background-color: #fff;
    }
    .content{
        height:calc(100% - 44px)
    }
</style>