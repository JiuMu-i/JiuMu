<template>
  <div class="regist">
    <div class="regist-head">
      <div class="head-bar">
        <!-- Logo -->
        <div class="logo-bar">
          <span
              @click="toHome"
              class="logo">JiuMu</span>
        </div>
        <!-- Goback -->
        <div class="go-back-bar">
          <span class="go-back-text">Already have an account?</span>
          <span
              @click="goBack"
              class="go-back-button">Sign in →</span>
        </div>
      </div>
    </div>
    <div class="regist-content">
      <div class="content-area">
        <div class="terminal"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export default {
  name: 'registIndex',
  setup () {
    const route = useRoute()
    const router = useRouter()
    const state = reactive({
      /**
       * Color related
       */
      background: null,
      paragraph: null,
      button: null,
      buttonText: null,
      stroke: null,
      strokeTranslucent: null,
      tertiary: null,
    })

    /**
     * Function
     */
    const goBack = () => {
      router.go(-1)
    }

    /**
     * onMounted
     */
    onMounted(() => {
      const currentTheme = JSON.parse(route.query.currentTheme)
      state.background = currentTheme.background
      state.paragraph = currentTheme.paragraph
      state.button = currentTheme.button
      state.buttonText = currentTheme.buttonText
      state.stroke = currentTheme.stroke
      state.strokeTranslucent = currentTheme.strokeTranslucent
      state.tertiary = currentTheme.tertiary
    })

    return {
      ...toRefs(state),
      goBack,
    }
  }
}
</script>

<style lang="scss" scoped>
.regist {
  display: grid;
  grid-template-rows: 0.4rem calc(100vh - 0.4rem);
  background-color: v-bind(background);
  .regist-head {
    .head-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 92%;
      height: 100%;
      margin: 0 auto;
      .logo-bar {
        .logo {
          font-family: 'HFBest-Wishes-2';
          font-size: 18px;
          color: v-bind(paragraph);
          cursor: pointer;
        }
      }
      .go-back-bar {
        font-size: 0.12rem;
        .go-back-text {
          color: v-bind(paragraph);
        }
        .go-back-button {
          margin-left: 10px;
          color: v-bind(button);
          cursor: pointer;
          &:hover {
            text-decoration: underline;
          }
        }
      }
    }
  }
  .regist-content {
    display: flex;
    align-items: center;
    justify-content: center;
    .content-area {
      width: 50%;
      height: 60%;
      border: 1px solid v-bind(stroke);
      border-radius: 4px;
      background-color: v-bind(strokeTranslucent);
      .terminal {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
