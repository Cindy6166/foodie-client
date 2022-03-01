/* eslint-disable no-new */
<template>
  <section class="msite">
    <!--main site header-->
    <HeaderTop :title="position.address">
       <span class="header_search" slot="left">
        <font-awesome-icon
          class="icon-search"
          icon="fa-solid fa-magnifying-glass"
          size="2x"
        />
      </span>
      <span class="header_login" slot="right">
        <span class="header_login_text">Login|Register</span>
      </span>
    </HeaderTop>
    <!--main site nav-->
    <nav class="msite_nav">
      <div class="swiper-container" v-if="categoryListArr.length">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(categoryList, index) in categoryListArr" :key="index">
            <a class="link_to_food" v-for="category in categoryList" :key="category.id">
              <div class="food_container">
                <img :src="category.image_url" />
              </div>
              <span>{{category.title}}</span>
            </a>
          </div>
        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination"></div>
      </div>
      <img src="./images/msite_back.svg" alt="back" v-else>
    </nav>
    <!--main site nearby shops-->
    <div class="msite_shop_list">
      <div class="shop_header">
        <font-awesome-icon class="icon-bars" icon="fa-solid fa-bars" />
        <span class="shop_header_title">附近商家</span>
      </div>
      <ShopList/>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'
import HeaderTop from '../../components/HeaderTop/HeaderTop.vue'
import ShopList from '../../components/ShopList/ShopList.vue'
// Import Swiper Vue.js components
import Swiper from 'swiper'
// Import Swiper style
import 'swiper/dist/css/swiper.min.css'

export default {
  mounted () {
    // trigger API getCategory
    this.$store.dispatch('getCategory')
    // trigger API getShops
    this.$store.dispatch('getShops')
  },
  components: {
    HeaderTop, ShopList
  },
  watch: {
    category () {
      // create swiper
      this.$nextTick(() => {
        new Swiper('.swiper-container', {
          loop: true,
          pagination: {
            el: '.swiper-pagination'
          }
        })
      })
    }
  },
  computed: {
    ...mapState(['position', 'category', 'shops']),
    /* 根據category一維陣列來生成二維陣列，其小陣列中的元素個數最大為8 */
    categoryListArr () {
      const arr = [] // 空的二維陣列
      let minArr = [] // 空的小陣列
      this.category.forEach(c => {
        if (minArr.length === 8) {
          minArr = []
        }
        if (minArr.length === 0) {
          arr.push(minArr)
        }
        minArr.push(c)
      })
      return arr
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/mixins.styl"
.msite
  width 100%
  .msite_nav
    bottom-border-1px(#e4e4e4)
    margin-top 45px
    height 200px
    background #fff
    .swiper-container
      width 100%
      height 100%
      .swiper-wrapper
        width 100%
        height 100%
        .swiper-slide
          display flex
          justify-content center
          align-items flex-start
          flex-wrap wrap
          .link_to_food
            width 25%
            .food_container
              display block
              width 100%
              text-align center
              padding-bottom 10px
              font-size 0
              img
                display inline-block
                width 50px
                height 50px
            span
              display block
              width 100%
              text-align center
              font-size 13px
              color #666
      .swiper-pagination
        >span.swiper-pagination-bullet-active
          background #02a774
  .msite_shop_list
    top-border-1px(#e4e4e4)
    margin-top 10px
    background #fff
    .shop_header
      padding 10px 10px 0
      .icon-bars
        margin-left 5px
        color #999
      .shop_header_title
        color #999
        font-size 14px
        line-height 20px
</style>
