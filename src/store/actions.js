import{
    ADD_COUNTER,
    ADD_TO_CART
} from './mutations-types'
export default {
    addCart(context,payload){//通过返回一个promise才是actions的真正用法
        return new Promise((resolve,reject) => {//通过返回一个promise来让外面知道我们已经完成这个操作了
            let oldProduct = null
        for(let item of context.state.cartList){
            if (item.iid === payload.iid){
                oldProduct = item
            }
        }
        if(oldProduct){//商品数量+1时执行下面的代码
            context.commit(ADD_COUNTER,oldProduct)
            resolve('商品的数量+1')//通过resolve将这个参数传出去
        }else{//添加了新的商品时执行下面的代码
            payload.count = 1
            context.commit(ADD_TO_CART,payload)
            resolve('添加了新的商品')
        }
        })
    }
}