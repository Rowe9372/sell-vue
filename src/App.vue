<template>
  <div id="app">
    <!-- <img src="./assets/logo.png">
    <router-view/> -->
    <sellerHeader :seller="seller"></sellerHeader>
    <div class="tab">
        <div class="item-tab">
          <router-link to='/goods'>商品</router-link>
        </div>
        <div class="item-tab">
          <router-link to='/rating'>评论</router-link>
        </div>
        <div class="item-tab">
          <router-link to='/seller'>商家</router-link>
        </div>
    </div>
    <!-- 路由出口  keep-alive保存当前状态-->
    <keep-alive>
        <router-view :seller="seller"></router-view>
    </keep-alive>  

  </div>
</template>

<script type="text/ecmascript-6">
import {urlParse} from './common/js/urlParse'
import sellerHeader from './components/seller/sellerHeader'

const ERR_OK = 0
export default {
  data() {
    return {
      seller: {
        // 解析url传参，获取商家id
        id: (() => {
          let queryParam = urlParse()
          console.log(queryParam)
          return queryParam.id
        })()
      }
    }
  },
  created() {
    this.$http.get('./api/seller?id=' + this.seller.id).then(response => {
      /* success callback */
      response = response.body
      console.log(response)
      /* status code */
      if (response.errno === ERR_OK) {
        // this.seller = response.data
        // 将id添加到数据里面  ES6 Object.assign方法
        this.seller = Object.assign(response.data, this.seller)
        console.log(this.seller)
      }
    }, response => {
      /* error callback */
    })
  },
  name: 'App',
  components: {
    sellerHeader
  }
}
</script>

<style lang="scss" type="text/scss">
    #app {
      .tab {
        display:flex;
        width:100%;
        height: (80rem/30);
        line-height: (80rem/30);
        box-sizing: border-box;
        border-bottom: 1px solid #e5e5e5;
        .item-tab {
          flex:1;
          text-align: center;
          a {
            display: block;
            font-size: (28rem/30);
            color: rgb(77,85,93);
            &.active {
              color: rgb(240,20,20);
            }
          }
        }
      }
    }
</style>
