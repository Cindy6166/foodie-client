import Vue from 'vue'
import {
  RECEIVE_POSITION,
  RECEIVE_CATEGORY,
  RECEIVE_SHOPS,
  RECEIVE_USER_INFO,
  RESET_USER_INFO,
  RECEIVE_GOODS,
  RECEIVE_RATINGS,
  RECEIVE_INFO,
  INCREMENT_FOOD_COUNT,
  DECREMENT_FOOD_COUNT,
  CLEAR_CART
} from './mutation-types'

export default {
  [RECEIVE_POSITION] (state, { position }) {
    state.position = position
  },

  [RECEIVE_CATEGORY] (state, { category }) {
    state.category = category
  },

  [RECEIVE_SHOPS] (state, { shops }) {
    state.shops = shops
  },

  [RECEIVE_USER_INFO] (state, { userInfo }) {
    state.userInfo = userInfo
  },

  [RESET_USER_INFO] (state) {
    state.userInfo = {}
  },

  [RECEIVE_GOODS] (state, { goods }) {
    state.goods = goods
  },

  [RECEIVE_RATINGS] (state, { ratings }) {
    state.ratings = ratings
  },

  [RECEIVE_INFO] (state, { info }) {
    state.info = info
  },

  [INCREMENT_FOOD_COUNT] (state, { food }) {
    if (!food.count) { // 第一次增加
      // food.count = 1 // 新增屬性，沒有數據綁定
      Vue.set(food, 'count', 1) // 讓新增的屬性有數據綁定
      state.cartFoods.push(food)
    } else {
      food.count++
    }
  },
  [DECREMENT_FOOD_COUNT] (state, { food }) {
    if (food.count) { // 有值才能減
      food.count--
      if (food.count === 0) {
        // 將food從cartFoods中移除
        state.cartFoods.splice(state.cartFoods.indexOf(food), 1)
      }
    }
  },
  [CLEAR_CART] (state) {
    // 清除food中的count
    state.cartFoods.forEach(food => { food.count = 0 })
    // 移除購物車中所有購物項
    state.cartFoods = []
  }
}
