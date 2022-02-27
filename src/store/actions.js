import {
  RECEIVE_POSITION,
  RECEIVE_CATEGORY,
  RECEIVE_SHOPS
} from './mutation-types'

import {
  reqPosition,
  reqCategory,
  reqShops
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
  }
}
