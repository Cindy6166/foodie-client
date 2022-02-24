<template>
  <div class="footer_guide">
    <span
      class="guide_item"
      :class="{ on: '/msite' === $route.path }"
      @click="goTo('/msite')"
    >
      <span class="item_icon">
        <font-awesome-icon icon="fa-solid fa-motorcycle" size="2x" />
      </span>
      <span>Delivery</span>
    </span>
    <span
      class="guide_item"
      :class="{ on: '/search' === $route.path }"
      @click="goTo('/search')"
    >
      <span class="item_icon">
        <font-awesome-icon icon="fa-solid fa-magnifying-glass" size="2x" />
      </span>
      <span>Search</span>
    </span>
    <span
      class="guide_item"
      :class="{ on: '/order' === $route.path }"
      @click="goTo('/order')"
    >
      <span class="item_icon">
        <font-awesome-icon icon="fa-solid fa-receipt" size="2x" />
      </span>
      <span>Order</span>
    </span>
    <span
      class="guide_item"
      :class="{ on: '/profile' === $route.path }"
      @click="goTo('/profile')"
    >
      <span class="item_icon">
        <font-awesome-icon icon="fa-solid fa-user" size="2x" />
      </span>
      <span>Profile</span>
    </span>
  </div>
</template>

<script>
export default {
  name: 'FooterGuide',
  methods: {
    goTo (path) {
      this.$router.replace(path)
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixins.styl';

.footer_guide { // footer
  top-border-1px(#e4e4e4);
  position: fixed;
  z-index: 100;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #fff;
  width: 100%;
  height: 55px;
  display: flex;

  .guide_item {
    display: flex;
    flex: 1;
    text-align: center;
    flex-direction: column;
    align-items: center;
    margin: 5px;
    color: #999999;

    &.on {
      color: #02a774;
    }

    span {
      font-size: 12px;
      margin-top: 2px;
      margin-bottom: 2px;

      .iconfont {
        font-size: 22px;
      }
    }
  }
}
</style>
