<template>
  <section class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">Foodie Delivery</h2>
        <div class="login_header_title">
          <a href="javascript:;" :class="{on:loginWay==='text'}" @click="loginWay='text'">簡訊登錄</a>
          <a href="javascript:;" :class="{on:loginWay==='password'}" @click="loginWay='password'">密碼登錄</a>
        </div>
      </div>
      <div class="login_content">
        <form @submit.prevent="login">
          <div :class="{on:loginWay==='text'}">
            <section class="login_message">
              <input type="tel" maxlength="11" placeholder="手機號碼" v-model="phone"/>
              <button :disabled="!phoneCorrect" class="get_verification" :class="{phone_Correct: phoneCorrect}" @click.prevent="getCode">
                {{countdownTimer > 0 ? `已發送 (${countdownTimer}s)` : '獲取驗證碼'}}
              </button>
            </section>
            <section class="login_verification">
              <input type="tel" maxlength="8" placeholder="驗證碼" v-model="code"/>
            </section>
            <section class="login_hint">
              温馨提示：若未註冊富迪外送，登錄時將自動註冊，且代表已同意
              <a>《用戶服務協議》</a>
            </section>
          </div>
          <div :class="{on:loginWay==='password'}">
            <section>
              <section class="login_message">
                <input type="tel" maxlength="11" placeholder="手機/郵箱/用户名" v-model="name"/>
              </section>
              <section class="login_verification">
                <input type="text" maxlength="8" placeholder="密码" v-if="showPwd" v-model="pwd"/>
                <input type="password" maxlength="8" placeholder="密码" v-else v-model="pwd"/>
                <div class="switch_button" :class="showPwd ? 'on':'off'" @click="showPwd=!showPwd" >
                  <div class="switch_circle" :class="{go_right: showPwd}"></div>
                  <span class="switch_text">{{showPwd ? '...':'see'}}</span>
                </div>
              </section>
              <section class="login_message">
                <input type="text" maxlength="11" placeholder="驗證碼" v-model="captcha"/>
                <img
                  class="get_verification"
                  src="http://localhost:4000/captcha"
                  alt="captcha"
                  @click="getCaptcha"
                  ref="captcha"
                />
              </section>
            </section>
          </div>
          <button class="login_submit">登錄</button>
        </form>
        <a href="javascript:;" class="about_us">關於我們</a>
      </div>
      <a class="go_back" @click="$router.back()">
        <font-awesome-icon class="icon-arrow" icon="fa-solid fa-angle-left" />
      </a>
    </div>
    <AlertTip :alertText="alertText" v-show="showAlert" @closeTip="closeTip"></AlertTip>>
  </section>
</template>

<script>
import AlertTip from '../../components/AlertTip/AlertTip.vue'
import { reqPwdLogin, reqSendCode, reqSmsLogin } from '../../api'
export default {
  data () {
    return {
      loginWay: 'text', // 'text'代表簡訊登錄,'password'代表密碼登錄
      countdownTimer: 0, // 倒數計時
      showPwd: false, // 是否顯示密碼
      phone: '', // 手機號碼
      name: '', // 用戶名
      pwd: '', // 密碼
      code: '', // 簡訊驗證碼
      captcha: '', // 圖形驗證碼
      alertText: '', // 提示文本
      showAlert: false // 是否顯示提示警告框
    }
  },
  components: { AlertTip },
  computed: {
    phoneCorrect () {
      return /^0\d{9}$/.test(this.phone)
    }
  },
  methods: {
    // 異步獲取驗證碼
    async getCode () {
      if (!this.countdownTimer) {
        // 啟動倒數計時
        this.countdownTimer = 30
        const intervalId = setInterval(() => {
          this.countdownTimer--
          if (this.countdownTimer <= 0) {
          // 停止計時
            clearInterval(intervalId)
          }
        }, 1000)

        // 發送ajax請求（向指定的手機號碼發送簡訊)
        const result = await reqSendCode(this.phone)
        if (result.code === 1) {
          // 顯示提示
          this.showAlertWithText(result.msg)
          // 停止計時
          if (this.countdownTimer) {
            this.countdownTimer = 0
            clearInterval(intervalId)
          }
        }
      }
    },
    showAlertWithText (alertText) {
      this.showAlert = true
      this.alertText = alertText
    },
    // 異步登入
    async login () {
      let result
      // 前台表單驗證
      if (this.loginWay === 'text') { // 簡訊登陸
        const { phoneCorrect, phone, code } = this
        if (!phoneCorrect) {
          // 提示：手機號碼格式錯誤
          this.showAlertWithText('手機號碼格式錯誤')
          return
        } else if (!/^\d{6}$/.test(code)) {
          // 提示：驗證碼必須為6位數字
          this.showAlertWithText('驗證碼必須為6位數字')
          return
        }
        // 發送ajax請求簡訊登錄
        result = await reqSmsLogin(phone, code)
      } else { // 密碼登錄
        const { name, pwd, captcha } = this
        if (!name) {
          // 提示：用戶名必須指定
          this.showAlertWithText('用戶名必須指定')
          return
        } else if (!pwd) {
          // 提示：密碼必須指定
          this.showAlertWithText('密碼必須指定')
          return
        } else if (!captcha) {
          // 提示：驗證碼必須指定
          this.showAlertWithText('驗證碼必須指定')
          return
        }
        // 發送ajax請求密碼登錄
        result = await reqPwdLogin(name, pwd, captcha)
      }
      // 停止計時
      if (this.countdownTimer) {
        this.countdownTimer = 0
        clearInterval(this.intervalId)
        console.log(this.intervalId)
      }
      // 根據result結果來處理數據
      if (result.code === 0) {
        // const user = result.data
        // 將user保存到vuex的state
        // 路由跳至個人中心頁面
        this.$router.replace('/profile')
      } else {
        // 顯示新的圖片驗證碼
        this.getCaptcha()

        // 顯示警告提示
        const msg = result.msg
        this.showAlertWithText(msg)

        // 清空captcha輸入匡
        this.captcha = ''
      }
    },
    // 關閉警告框
    closeTip () {
      this.showAlert = false
      this.alertText = ''
    },
    // 獲取新的圖片驗證碼
    getCaptcha () {
      this.$refs.captcha.src = 'http://localhost:4000/captcha'
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/mixins.styl"
.loginContainer
  width 100%
  height 100%
  background #fff
  .loginInner
    padding-top 60px
    width 80%
    margin 0 auto
    .login_header
      .login_logo
        font-size 40px
        font-weight bold
        color #02a774
        text-align center
      .login_header_title
        padding-top 40px
        text-align center
        >a
          color #333
          font-size 14px
          padding-bottom 4px
          &:first-child
            margin-right 40px
          &.on
            color #02a774
            font-weight 700
            border-bottom 2px solid #02a774
    .login_content
      >form
        >div
          display none
          &.on
            display block
          input
            width 100%
            height 100%
            padding-left 10px
            box-sizing border-box
            border 1px solid #ddd
            border-radius 4px
            outline 0
            font 400 14px Arial
            &:focus
              border 1px solid #02a774
          .login_message
            position relative
            margin-top 16px
            height 48px
            font-size 14px
            background #fff
            .get_verification
              position absolute
              top 50%
              right 10px
              transform translateY(-50%)
              border 0
              color #ccc
              font-size 14px
              background transparent
              &.phone_Correct
                color black
          .login_verification
            position relative
            margin-top 16px
            height 48px
            font-size 14px
            background #fff
            .switch_button
              font-size 12px
              border 1px solid #ddd
              border-radius 8px
              transition background-color .3s,border-color .3s
              padding 0 6px
              width 30px
              height 16px
              line-height 16px
              color #fff
              position absolute
              top 50%
              right 10px
              transform translateY(-50%)
              &.off
                background #fff
                .switch_text
                  float right
                  color #ddd
              &.on
                background #02a774
              >.switch_circle
                position absolute
                top -1px
                left -1px
                width 16px
                height 16px
                border 1px solid #ddd
                border-radius 50%
                background #fff
                box-shadow 0 2px 4px 0 rgba(0,0,0,.1)
                transition transform .3s
                &.go_right
                  transform translateX(27px)
          .login_hint
            margin-top 12px
            color #999
            font-size 14px
            line-height 20px
            >a
              color #02a774
        .login_submit
          display block
          width 100%
          height 42px
          margin-top 30px
          border-radius 4px
          background #4cd96f
          color #fff
          text-align center
          font-size 16px
          line-height 42px
          border 0
      .about_us
        display block
        font-size 12px
        margin-top 20px
        text-align center
        color #999
    .go_back
      position absolute
      top 5px
      left 5px
      width 30px
      height 30px
      >.icon-arrow
        font-size 20px
        color #999
</style>
