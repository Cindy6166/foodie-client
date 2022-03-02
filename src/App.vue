<template>
  <div id="app">
    <router-view/>
    <FooterGuide v-show="$route.meta.showFooter"/>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import FooterGuide from './components/FooterGuide/FooterGuide.vue'
export default {
  name: 'App',
  components: {
    FooterGuide
  },
  mounted () {
    this.getPosition()
    this.getUserInfo()
  },
  methods: {
    ...mapActions(['getPosition', 'getUserInfo'])
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
#app
  width: 100%;
  height: 100%;
  background: #f5f5f5;

</style>
