import Vue from 'vue'
import App from './App.vue'
import '../static/css/reset.css'
import router from './router'
import store from './store'
/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import specific icons */
import { faUserSecret, faMotorcycle, faMagnifyingGlass, faReceipt, faUser, faBars, faCircleUser, faMobileScreenButton, faAngleRight, faIdCard, faTrophy, faBuilding, faAngleLeft } from '@fortawesome/free-solid-svg-icons'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* add icons to the library */
library.add(faUserSecret, faMotorcycle, faMagnifyingGlass, faReceipt, faUser, faBars, faCircleUser, faMobileScreenButton, faAngleRight, faIdCard, faTrophy, faBuilding, faAngleLeft)

/* add font awesome icon component */
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  render: h => h(App),
  router, // 使用vue-router
  store // 使用vuex
})
