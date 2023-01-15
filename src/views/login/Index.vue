<template>
  <div class="login">
    <div class="logo-bar">
      <span
          @click="rushHome"
          class="logo">JiuMu</span>
    </div>
    <div class="login-form">
      <span class="form-title">登录</span>
      <!-- NickName Input -->
      <n-input
          v-model:value="nickName"
          type="text"
          :input-props="inputProps"
          placeholder="昵称"
          clearable
          class="form-input">
        <template #prefix>
          <n-icon
              size="20"
              class="form-input-icon">
            <user-astronaut/>
          </n-icon>
        </template>
      </n-input>
      <!-- PassWord Input -->
      <n-input
          v-model:value="passWord"
          type="password"
          :input-props="inputProps"
          show-password-on="click"
          placeholder="密码"
          clearable
          class="form-input">
        <!-- PassWord Input Prefix Icon -->
        <template #prefix>
          <n-icon
              size="20"
              class="form-input-icon">
            <key-outlined/>
          </n-icon>
        </template>
        <!-- PassWord Input Suffix Icon Open Status -->
        <template #password-visible-icon>
          <n-icon
              size="20"
              class="form-input-icon">
            <glasses24-regular/>
          </n-icon>
        </template>
        <!-- PassWord Input Suffix Icon Close Status -->
        <template #password-invisible-icon>
          <n-icon
              size="20"
              class="form-input-icon">
            <glasses24-filled/>
          </n-icon>
        </template>
      </n-input>
      <!-- Button Group -->
      <div class="button-group">
        <n-button
            :loading="loginLoading"
            :disabled="loginDisabled"
            :color="button"
            :text-color="buttonText"
            strong
            @click="loginHandler"
            class="login-button">登录</n-button>
        <n-button
            :text-color="cardParagraph"
            icon-placement="right"
            @click="toRegistHandler"
            class="regist-button">
          没有账号？还不赶紧注册一个！
          <template #icon>
            <n-icon class="regist-button-suffix">
              <door-open/>
            </n-icon>
          </template>
        </n-button>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, inject, watch } from 'vue'
import { useRouter } from 'vue-router'
import { UserAstronaut } from '@vicons/fa'
import { KeyOutlined } from '@vicons/material'
import { Glasses24Filled } from '@vicons/fluent'
import { Glasses24Regular } from '@vicons/fluent'
import { DoorOpen } from '@vicons/fa'

export default {
  name: 'loginIndex',
  components: {
    UserAstronaut,
    KeyOutlined,
    Glasses24Filled,
    Glasses24Regular,
    DoorOpen
  },
  setup () {
    const router = useRouter()
    const _sharedTheme = inject('sharedTheme')
    const state = reactive({
      /**
       * Color related
       */
      button: _sharedTheme.button,
      buttonText: _sharedTheme.buttonText,
      cardHeadline: _sharedTheme.cardHeadline,
      cardParagraph: _sharedTheme.cardParagraph,
      cardTagBackground: _sharedTheme.cardTagBackground,
      cardHighlight: _sharedTheme.cardHighlight,
      /**
       * Login related
       */
      inputProps: {
        style: {
          color: _sharedTheme.cardTagText,
          height: '100%',
          fontSize: '0.11rem',
          letterSpacing: '1px',
        },
      },
      nickName: null,
      passWord: null,
      loginLoading: false,
      loginDisabled: false,
    })

    /**
     * Function
     */
    const loginHandler = () => {
      state.loginLoading = true
      state.loginDisabled = true
    }

    const toRegistHandler = () => {
      router.push({
        path: '/regist',
        query: {
          currentTheme: JSON.stringify(_sharedTheme)
        }
      })
    }

    /**
     * watch
     */
    watch(_sharedTheme, (from, to) => {
      state.button = to.button
      state.buttonText = to.buttonText
      state.cardHeadline = to.cardHeadline
      state.cardParagraph = to.cardParagraph
      state.cardTagBackground = to.cardTagBackground
      state.cardHighlight = to.cardHighlight
      state.inputProps.style.color = to.cardTagText
    })

    return {
      ...toRefs(state),
      loginHandler,
      toRegistHandler,
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  display: grid;
  grid-template-rows: 0.6rem auto;
  justify-items: center;
  .logo-bar {
    .logo {
      font-family: 'HFBest-Wishes-2';
      font-size: 28px;
      color: v-bind(cardParagraph);
    }
  }
  .login-form {
    display: grid;
    grid-template-rows: 0.3rem 0.3rem 0.3rem 0.6rem;
    justify-items: center;
    row-gap: 0.1rem;
    width: 80%;
    .form-title {
      font-size: 0.16rem;
      color: v-bind(cardParagraph);
    }
    .form-input {
      background-color: v-bind(cardTagBackground);
      border: none;
      .form-input-icon {
      }
    }
    .button-group {
      display: flex;
      flex-direction: column;
      width: 100%;
      .login-button {
        height: 0.28rem;
        font-size: 0.14rem;
        letter-spacing: 6px;
        border-radius: 15px 15px 0 0;
      }
      .regist-button {
        height: 0.28rem;
        font-size: 0.08rem;
        letter-spacing: 5px;
        border-radius: 0 0 15px 15px;
      }
    }
  }
}
</style>