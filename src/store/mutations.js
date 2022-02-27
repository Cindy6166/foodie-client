import {
  RECEIVE_POSITION,
  RECEIVE_CATEGORY,
  RECEIVE_SHOPS
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
  }
}
