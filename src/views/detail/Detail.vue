<template>
  <div id="detail">
      <detail-nav-bar class="detail-nav" @titleClick = 'titleClick' ref="detail-nav"></detail-nav-bar>
      <scroll class="content" ref="scroll" @scroll = 'contentScroll' :probe-type = '3'>
        <detail-swiper :top-images = 'topImages'></detail-swiper>
        <detail-base-info :goods = 'goods'></detail-base-info>
        <detail-shop-info :shop = 'shop'></detail-shop-info>
        <detail-goods-info :detail-info = 'detailInfo' @imgLoad = 'imgLoad'></detail-goods-info>
        <detail-param-info ref="params" :paramInfo="paramsInfo"></detail-param-info>
        <detail-comment-info ref="comment" :commentInfo = 'commentInfo'></detail-comment-info>
        <goods-list ref="recommend" :goods = 'recommends'></goods-list>
      </scroll>
      <detail-bottom-bar @addCart = 'addToCart'></detail-bottom-bar>
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
import GoodsList from '../../components/content/goods/GoodsList'
import DetailBottomBar from './childComps/DetailBottomBar'

import Scroll from '../../components/common/scroll/Scroll'

import {getDetail,getRecommend,Goods,Shop,GoodsParam} from '../../network/detail'
import {itemListenerMixin} from '../../common/mixin'
import { debounce } from '../../common/utils'
export default {
    components: {
        DetailNavBar,
        DetailSwiper,
        DetailBaseInfo,
        DetailShopInfo,
        Scroll,
        DetailGoodsInfo,
        DetailParamInfo,
        DetailCommentInfo,
        GoodsList,
        DetailBottomBar 
    },
    mixins: [//混入
        itemListenerMixin
    ],
    data(){
        return{
            iid:null,
            topImages:[],
            goods:{},
            shop:{},
            detailInfo:{},
            paramsInfo:{},
            commentInfo:{},
            recommends:[],
            themeTopYs:[],
            getThemeTopY:null,
            currentIndex:0
        }
    },
    methods: {
        imgLoad(){
        this.$refs.scroll.refresh()
        this.getThemeTopY()//防抖操作的函数，获取三个组件的高度
        
    },
        titleClick(index){
        // this.$refs.scroll.scrollTo(0,this.themeTopYs[index],500)再发生点击事件是进行一个跳转的操作
        console.log(index)
    },
        contentScroll(pos){
            const  posY = -pos.posY
            let length = this.themeTopYs.length
            for(let i = 0; i < length ; i++){
                if(//做出一个判断，这个语法比较复杂，好好看，虽然能解决问题，但是这个判断会执行很多次，所以可以再加一个判断
                    this.currnetIndex !== i &&
                    ((i < length - 1 && posY >thie.themeTopYs[i] && posY < themeTopYs[i+1])
                     ||//或
                    (i === length - 1 && posY > this.themeTopYs[i])))
                    {
                    this.currentIndex = i
                    this.$refs.nav.currentIndex = this.currentIndex
                }
            }
        },
        addToCart(){
            //发生添加到购物车的事件后，将所有需要的信息传过去
            const product = {}
            // product.image = this.topImages[0]
            // product.title = this.Goods.title
            // product.desc = this.Goods.desc
            // product.price = this.Goods.realPrice
            // product.iid = this.Goods.iid
            //将商品添加都购物车里面vuex
            this.$store.commit('addCart',product)
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
            // this.$nextTick(() => {但是再这里调用这个函数依然不行，再获取高度的时候没有把图片加载再内
            //     this.themeTopYs.push(0)
            //     this.themeTopYs.push(this.$refs.params.$el.offsetTop)
            //     this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
            //     this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)  
            // })这个函数表示上面的东西执行完成之后在来调用这个函数，注意要写在这个getDetail函数里面才能生效
        })
        getRecommend().then(res => {//获取推荐数据
            console.log(res)
            // this.recommends = res.data.list保存推荐数据
        })

        this.getThemeTopY = debounce(() => {//再获取高度时候进行防抖操作
            // this.themeTopYs = []在图片加载完成后再给这个东西赋值，就可以保证获取到的高度是对的
            // this.themeTopYs.push(0)但是会被调用很多次，我们可以进行防抖动操作
            // this.themeTopYs.push(this.$refs.params.$el.offsetTop)
            // this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
            // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
        },100)
    },
    mounted () {
    },
    updated () {
        this.themeTopYs = []
        this.themeTopYs.push(0)
        this.themeTopYs.push(this.$refs.params.$el.offsetTop)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)  
        
    },
    destroyed () {
        this.$bus.$off('itemImageLoad',this.itemImglistener)//当这个页面不活跃时取消这个事件的监听
    },
   
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