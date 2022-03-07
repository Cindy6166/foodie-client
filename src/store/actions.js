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

import {
  reqPosition,
  reqCategory,
  reqShops,
  reqUserInfo,
  reqLogout,
  reqShopGoods,
  reqShopRatings,
  reqShopInfo
} from '../api'

export default {
  // 異步獲取位置
  async getPosition ({ commit, state }) {
    // 發送異步ajax請求
    const geohash = state.latitude + ',' + state.longitude
    const result = await reqPosition(geohash)
    // 提交一個mutation
    if (result.code === 0) {
      const position = result.data
      commit(RECEIVE_POSITION, { position })
    }
  },

  // 異步獲取分類
  async getCategory ({ commit }) {
    // 發送異步ajax請求
    const result = await reqCategory()
    // 提交一個mutation
    if (result.code === 0) {
      const category = result.data
      commit(RECEIVE_CATEGORY, { category })
    }
  },

  // 異步獲取商家
  async getShops ({ commit, state }) {
    // 發送異步ajax請求
    const { latitude, longitude } = state
    const result = await reqShops(latitude, longitude)
    // 提交一個mutation
    if (result.code === 0) {
      const shops = result.data
      commit(RECEIVE_SHOPS, { shops })
    }
  },

  // 同步紀錄用戶資訊
  recordUserInfo ({ commit }, userInfo) {
    commit(RECEIVE_USER_INFO, { userInfo })
  },
  // 異步獲取用戶資訊
  async getUserInfo ({ commit }) {
    const result = await reqUserInfo()
    if (result.code === 0) {
      const userInfo = result.data
      commit(RECEIVE_USER_INFO, { userInfo })
    }
  },
  // 異步登出
  async logout ({ commit }) {
    const result = await reqLogout()
    if (result.code === 0) {
      commit(RESET_USER_INFO)
    }
  },
  // 異步獲取商家商品列表
  async getShopGoods ({ commit }, callback) {
    const result = await reqShopGoods()
    if (result.code === 0) {
      const goods = result.data
      commit(RECEIVE_GOODS, { goods })
      // 數據更新完成，通知一下組件
      callback && callback() // 因callback可傳可不傳
    }
  },
  // 異步獲取商家評價列表
  async getShopRatings ({ commit }, callback) {
    const result = await reqShopRatings()
    if (result.code === 0) {
      const ratings = result.data
      commit(RECEIVE_RATINGS, { ratings })
      callback && callback()
    }
  },
  // 異步獲取商家資訊
  async getShopInfo ({ commit }) {
    const result = await reqShopInfo()
    if (result.code === 0) {
      const info = result.data
      commit(RECEIVE_INFO, { info })
    }
  },
  // 同步更新food中的count值
  updateFoodCount ({ commit }, { isAdd, food }) {
    if (isAdd) {
      commit(INCREMENT_FOOD_COUNT, { food })
    } else {
      commit(DECREMENT_FOOD_COUNT, { food })
    }
  },
  // 同步清空foodCart
  clearCart ({ commit }) {
    commit(CLEAR_CART)
  }
}
