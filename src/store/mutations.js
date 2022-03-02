import {
  RECEIVE_POSITION,
  RECEIVE_CATEGORY,
  RECEIVE_SHOPS,
  RECEIVE_USER_INFO,
  RESET_USER_INFO
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
  }
}
