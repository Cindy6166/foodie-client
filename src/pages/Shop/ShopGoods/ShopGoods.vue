<template>
  <div>
    <div class="goods">
      <div class="menu-wrapper">
        <ul>
          <li class="menu-item" v-for="(good, index) in goods" :key="index" :class="{current: index === currentIndex}" @click="clickMenuItem(index)">
            <span class="text bottom-border-1px">
              <img class="icon" :src="good.icon" v-if="good.icon">
              {{good.name}}
            </span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper">
        <ul ref="foodsUl">
          <li class="food-list-hook" v-for="(good, index) in goods" :key="index">
            <h1 class="title">{{good.name}}</h1>
            <ul>
              <li class="food-item bottom-border-1px" v-for="(food, index) in good.foods" :key="index" @click="showFoodModal(food)">
                <div class="icon">
                  <img width="57" height="57" :src="food.icon">
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售 {{food.sellCount}} 份</span>
                    <span>好評率 {{food.rating}} %</span>
                  </div>
                  <div class="price">
                    <span class="now">$ {{food.price}}</span>
                    <!-- <span class="old">￥{{food.oldPrice}}</span> -->
                  </div>
                  <div class="cartcontrol-wrapper">
                    <CartControl :food="food"/>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <ShopCart/>
    </div>
    <FoodModal :food="food" ref="foodModal"/>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import { mapState } from 'vuex'
import CartControl from '../../../components/CartControl/CartControl.vue'
import FoodModal from '../../../components/FoodModal/FoodModal.vue'
import ShopCart from '../../../components/ShopCart/ShopCart.vue'
export default {
  name: 'ShopGoods',
  components: { CartControl, FoodModal, ShopCart },
  data () {
    return {
      scrollY: 0, // 右側滑動時Y軸的座標
      tops: [], // 所有右側li分類的top所組成的陣列
      food: {} // 需要顯示時的food
    }
  },
  mounted () {
    this.$store.dispatch('getShopGoods', () => { // 數據更新後執行
      this.$nextTick(() => { // 列表數據更新顯示後執行
        this._initScroll()
        this._initTops()
      })
    })
  },
  computed: {
    ...mapState(['goods']),

    // 得到當前分類的index
    currentIndex () {
      // 條件數據
      const { scrollY, tops } = this
      // 根據條件計算產生一個結果
      const index = tops.findIndex((top, index) => {
        // scrollY >= 當前top && scrollY < 下一個top
        return scrollY >= top && scrollY < tops[index + 1]
      })
      // 返回結果
      return index
    }
  },
  methods: {
    // 初始化滾動
    _initScroll () {
      // 列表顯示之後創建
      new BScroll('.menu-wrapper', {
        click: true
      })
      this.foodsScroll = new BScroll('.foods-wrapper', {
        probeType: 2, // 因為慣性滑動不會觸發
        click: true
      })
      // 給右側列表綁定scroll監聽
      this.foodsScroll.on('scroll', ({ x, y }) => {
        this.scrollY = Math.abs(y) // absolute value
      })
      // 給右側列表綁定scroll結束的監聽
      this.foodsScroll.on('scrollEnd', ({ x, y }) => {
        this.scrollY = Math.abs(y) // absolute value
      })
    },
    // 初始化tops
    _initTops () {
      // 1.初始化
      const tops = []
      let top = 0
      tops.push(top)
      // 2.收集
      // 找到所有分類的li
      const lis = this.$refs.foodsUl.getElementsByClassName('food-list-hook')
      Array.prototype.slice.call(lis).forEach(li => {
        top += li.clientHeight
        tops.push(top)
      })
      // 3.更新數據
      this.tops = tops
    },
    clickMenuItem (index) {
      // 點擊左側列表時，使右側列表滑動到對應的位置
      const scrollY = this.tops[index] // 得到目標位置的scrollY
      this.scrollY = scrollY // 立即更新scrollY（讓點擊效果立即產生，避免延遲
      this.foodsScroll.scrollTo(0, -scrollY, 300) // 平滑滾動右側列表
    },
    // 顯示點擊時的food
    showFoodModal (food) {
      // 設置food
      this.food = food
      // 顯示FoodModal (父組件調用子組件對象的方法)
      this.$refs.foodModal.toggleShow()
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/mixins.styl"
  .goods
    display: flex
    position: absolute
    top: 195px
    bottom: 46px
    width: 100%
    background: #fff;
    overflow: hidden
    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background: #f3f5f7
      .menu-item
        display: table
        height: 54px
        width: 56px
        padding: 0 12px
        line-height: 14px
        &.current
          position: relative
          z-index: 10
          margin-top: -1px
          background: #fff
          color: $green
          font-weight: 700
          .text
            border-none()
        .icon
          display: inline-block
          vertical-align: top
          width: 12px
          height: 12px
          margin-right: 2px
          background-size: 12px 12px
          background-repeat: no-repeat
        .text
          display: table-cell
          width: 56px
          vertical-align: middle
          bottom-border-1px(rgba(7, 17, 27, 0.1))
          font-size: 12px
    .foods-wrapper
      flex: 1
      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dde1
        font-size: 12px
        color: rgb(147, 153, 159)
        background: #f3f5f7
      .food-item
        display: flex
        margin: 18px
        padding-bottom: 18px
        bottom-border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
          margin-bottom: 0
        .icon
          flex: 0 0 57px
          margin-right: 10px
        .content
          flex: 1
          .name
            margin: 2px 0 8px 0
            height: 14px
            line-height: 14px
            font-size: 14px
            color: rgb(7, 17, 27)
          .desc, .extra
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)
          .desc
            line-height: 12px
            margin-bottom: 8px
          .extra
            .count
              margin-right: 12px
          .price
            font-weight: 700
            line-height: 24px
            .now
              margin-right: 8px
              font-size: 14px
              color: rgb(240, 20, 20)
            .old
              text-decoration: line-through
              font-size: 10px
              color: rgb(147, 153, 159)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 12px
</style>
