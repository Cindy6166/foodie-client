import Vue from 'vue'
import App from './App.vue'
import '../static/css/reset.css'
import router from './router'
import store from './store'
import VueLazyload from 'vue-lazyload'
import loading from './common/img/loading.gif'
import { Button } from 'mint-ui'
import './mock/mockServer' // 加載mockServer
import './filters' // 加載過濾器

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import specific icons */
import { faUserSecret, faMotorcycle, faMagnifyingGlass, faReceipt, faUser, faBars, faCircleUser, faMobileScreenButton, faAngleRight, faIdCard, faTrophy, faBuilding, faAngleLeft, faCircleXmark, faCirclePlus, faCircleMinus, faCartShopping, faThumbsUp, faThumbsDown, faCircleCheck } from '@fortawesome/free-solid-svg-icons'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* add icons to the library */
library.add(faUserSecret, faMotorcycle, faMagnifyingGlass, faReceipt, faUser, faBars, faCircleUser, faMobileScreenButton, faAngleRight, faIdCard, faTrophy, faBuilding, faAngleLeft, faCircleXmark, faCirclePlus, faCircleMinus, faCartShopping, faThumbsUp, faThumbsDown, faCircleCheck)

/* add font awesome icon component */
Vue.component('font-awesome-icon', FontAwesomeIcon) // <font-awesome-icon>

Vue.component(Button.name, Button) // <mt-button>
Vue.use(VueLazyload, { // 產生內部自定義指令lazy
  loading
})
Vue.config.productionTip = false

// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  render: h => h(App),
  router, // 使用vue-router
  store // 使用vuex
})
