import Vue from 'vue'
import Router from 'vue-router'
import Resource from 'vue-resource'
import goods from '@/components/goods/goods'
import rating from '@/components/rating/rating'
import seller from '@/components/seller/seller'

Vue.use(Router)
Vue.use(Resource)

export default new Router({
  routes: [
    {
      path: '/goods',
      name: 'goods',
      component: goods
    },
    {
	  path: '/rating',
	  name: 'rating',
      component: rating
    },
    {
      path: '/seller',
      name: 'seller',
      component: seller
    }
  ],
  linkActiveClass: 'active'
})
