import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '../pages/Login/Login.vue'
import MSite from '../pages/MSite/MSite.vue'
import Order from '../pages/Order/Order.vue'
import Profile from '../pages/Profile/Profile.vue'
import Search from '../pages/Search/Search.vue'
import Shop from '../pages/Shop/Shop.vue'
import ShopGoods from '../pages/Shop/ShopGoods/ShopGoods'
import ShopInfo from '../pages/Shop/ShopInfo/ShopInfo'
import ShopRating from '../pages/Shop/ShopRating/ShopRating'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '/',
      redirect: '/msite'
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/msite',
      component: MSite,
      meta: {
        showFooter: true
      }
    },
    {
      path: '/order',
      component: Order,
      meta: {
        showFooter: true
      }
    },
    {
      path: '/profile',
      component: Profile,
      meta: {
        showFooter: true
      }
    },
    {
      path: '/search',
      component: Search,
      meta: {
        showFooter: true
      }
    },
    {
      path: '/shop',
      component: Shop,
      children: [
        {
          path: '',
          redirect: '/shop/goods'
        },
        {
          path: '/shop/goods',
          component: ShopGoods
        },
        {
          path: '/shop/info',
          component: ShopInfo
        },
        {
          path: '/shop/rating',
          component: ShopRating
        }
      ]
    }
  ]
})
