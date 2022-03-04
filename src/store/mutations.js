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
  DECREMENT_FOOD_COUNT
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
    } else {
      food.count++
    }
  },
  [DECREMENT_FOOD_COUNT] (state, { food }) {
    if (food.count) { // 有值才能減
      food.count--
    }
  }
}
