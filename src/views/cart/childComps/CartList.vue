<template>
  <div class="cart-list">
        <scroll class="cart-list-content" ref="scroll">
            <cart-list-item v-for="(item,index) in cartList" :product = 'item' :key="index"></cart-list-item>
        </scroll>
  </div>
</template>

<script>
import Scroll from '../../../components/common/scroll/Scroll'
import CartListItem from './CartListItem'

export default {
    components: {
        Scroll,
        CartListItem
        
    },
    computed: {
        cartList(){
            return this.$store.state.cartList
        }
    },
    activated () {
        this.$refs.scroll.refresh()
    }
}
</script>

<style>
    .cart-list{
        height:calc(100% - 44px - 49px - 40px);
        overflow: hidden;

    }
  .cart-list-content{
      height: 100%;
  }
</style>