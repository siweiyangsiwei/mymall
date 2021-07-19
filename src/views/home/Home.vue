<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <home-swiper :banners = 'banners'></home-swiper>  
    <home-recommend-view :recommends="recommends"></home-recommend-view>
    <feature></feature>
    <tab-control class="tab-control" 
    :titles = "['流行','新款','精选']"
    @tabClick = 'tabClick'></tab-control>
    <goods-list :goods ="showGoods"></goods-list>
  </div>
</template>

<script>
import NavBar from '../../components/common/navbar/NavBar'
import TabControl from '../../components/content/tabControl/TabControl'
import GoodsList from '../../components/content/goods/GoodsList'

import HomeSwiper from './childComps/HomeSwiper'
import HomeRecommendView from './childComps/HomeRecommendView.vue'
import Feature from './childComps/Feature'

import {getHomeMultidata ,getHomeGoods} from '../../network/home'
export default {
  components: {
    NavBar,
    HomeSwiper,
    HomeRecommendView,
    Feature,
    TabControl,
    GoodsList,
  },
  data(){
    return {
      banners:[],
      recommends:[],
      goods: {
        'pop':{page:0,list:[]},
        'new':{page:0,list:[]},
        'sell':{page:0,list:[]},
      },
      currentType:'pop'//作为事件监听的一个贮存变量

    }
  },
  created(){//当组件创建完之后就需要马上发送网络请求了
    this.getHomeMultidata()//请求轮播图的数据
    this.getHomeGoods('pop')//请求商品数据
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  computed: {
    showGoods(){
      return this.goods[this.currentType].list
    }
  },
  methods: {
    //事件监听相关方法
    tabClick(index){
      switch(index){
        case 0 :
          this.currentType = 'pop'
          break
        case 1 :
          this.currentType = 'new'
          break
        case 2 :
          this.currentType = 'sell'
          break
      }
    },


    //网络请求相关方法
    getHomeMultidata(){
      getHomeMultidata().then(res => {
      this.banners = res.data.banner.list
      this.recommends = res.data.recommend.list
    })
    },
    getHomeGoods(type){
      const page = this.goods[type].page + 1
        getHomeGoods(type,page).then(res => {
        // for(let n in res.data.list){
        //   this.goods[type].list.push(n)
        // }
        //this.goods[type].list.push(...res.data.list)
        // this.goods[type].page += 1
        // 由于没有接口，这个直接不写了
    })
    }
  }
}
</script>

<style>
  #home{
    height: 10000px;
    padding-top: 44px;/*加个外边距使其不会被nav遮住 */
  }
  .home-nav{
    background-color:var(--color-tint);/*设置整个navbar的背景颜色 */
    color: white;/*设置文字颜色 */
    position:fixed;/*设置固定定位，在页面中一直显示 */
    left: 0;
    top: 0;
    right: 0;
    z-index: 9;/*使其不会被轮播图遮住*/
  }
  .tab-control{
    position: sticky;/*设置将这个tab保持在最上方 */
    top: 44px;
    z-index: 9;
  }
</style>