<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <home-swiper :banners = 'banners'></home-swiper>  
    <home-recommend-view :recommends="recommends"></home-recommend-view>
    <feature></feature>
  </div>
</template>

<script>
import NavBar from '../../components/common/navbar/NavBar'
import HomeSwiper from './childComps/HomeSwiper'
import HomeRecommendView from './childComps/HomeRecommendView.vue'
import Feature from './childComps/Feature'
import {getHomeMultidata} from '../../network/home'


export default {
  components: {
    NavBar,
    HomeSwiper,
    HomeRecommendView,
    Feature
  },
  data(){
    return {
      banners:[],
      recommends:[]
    }
  },
  created(){//当组件创建完之后就需要马上发送网络请求了
    getHomeMultidata().then(res => {
      this.banners = res.data.banner.list
      this.recommends = res.data.recommend.list
    })
  }
}
</script>

<style>
  #home{
    height: 1000px;
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
</style>