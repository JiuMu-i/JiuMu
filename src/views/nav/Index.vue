<template>
  <div class="nav">
    <div class="nav-bar">
      <!-- Logo -->
      <div class="logo-bar">
        <span
            @click="rushHome"
            class="logo">JiuMu</span>
      </div>
      <!-- nav items -->
      <div class="nav-items-bar">
        <!-- Games -->
        <div class="items">
          <span>游戏</span>
        </div>
        <!-- Chat -->
        <div class="items">
          <span>聊天</span>
        </div>
        <!-- Blog -->
        <div class="items">
          <span>博客</span>
        </div>
        <!-- Tools -->
        <div class="items">
          <span>工具</span>
        </div>
        <!-- Search -->
        <div class="search-item">
          <component
              :is="searchComponent"
              :border-bottom-color-pre="stroke"
              :border-bottom-color-suf="tertiary"
              :text-color="paragraph"></component>
        </div>
      </div>
      <!-- Other -->
      <div class="other-bar">
        <!-- Calendar -->
        <div class="calendar-item">
          <span class="time-item">{{ time }}</span>
          <span class="date-item">{{ date }} {{ week }}</span>
        </div>
        <!-- Change theme -->
        <n-dropdown
            trigger="click"
            size="huge"
            :options="themes"
            @select="changeThemes">
          <n-button
              :color="button"
              :text-color="buttonText">主题</n-button>
        </n-dropdown>
        <!-- Github -->
        <n-icon
            size="30"
            @click="toGit"
            class="github">
          <logo-github/>
        </n-icon>
        <!-- Avatar -->
        <n-icon
            size="30"
            @click="openLogin = true"
            class="avatar">
          <account-circle-filled/>
        </n-icon>
        <n-modal
            v-model:show="openLogin"
            :mask-closable="false"
            preset="card"
            size="huge"
            :bordered="false"
            role="dialog"
            aria-modal="true"
            :style="loginModal">
          <component :is="loginComponent"></component>
        </n-modal>
      </div>
    </div>
  </div>
</template>

<script>
import { defineAsyncComponent, markRaw, reactive, toRefs, onMounted, inject, watch } from 'vue'
import { useStore } from 'vuex'
import { LogoGithub } from '@vicons/ionicons4'
import { AccountCircleFilled } from '@vicons/material'
import { themesList } from '../../assets/data/themes.js'
import DateParsing from '../../util/dateParsing.js'

function importComponent () {
  const defineSearch = defineAsyncComponent(() => import('../../components/Search.vue'))
  const defineLogin = defineAsyncComponent(() => import('../login/Index.vue'))

  const markSearch = markRaw(defineSearch)
  const markLogin = markRaw(defineLogin)

  return { markSearch, markLogin }
}

export default {
  name: 'navIndex',
  components: {
    LogoGithub,
    AccountCircleFilled
  },
  setup () {
    const components = importComponent()
    const store = useStore()
    const message = useMessage()
    const _sharedTheme = inject('sharedTheme')
    const dateParsing = new DateParsing()
    const state = reactive({
      searchComponent: components.markSearch,
      loginComponent: components.markLogin,
      /**
       * Themes related
       */
      themes: themesList,
      /**
       * Clock related
       */
      time: dateParsing.dateFormat(new Date(), 'HH:mm:ss'),
      date: dateParsing.dateFormat(new Date(), 'yyyy-MM-dd', ['.', ':', ' ']),
      week: dateParsing.getWeek(),
      /**
       * Color related
       */
      background: _sharedTheme.background,
      paragraph: _sharedTheme.paragraph,
      button: _sharedTheme.button,
      buttonText: _sharedTheme.buttonText,
      stroke: _sharedTheme.stroke,
      strokeTranslucent: _sharedTheme.strokeTranslucent,
      tertiary: _sharedTheme.tertiary,
      /**
       * Login related
       */
      openLogin: false,
      loginModal: {
        width: '560px',
        background: _sharedTheme.cardBackground,
      },
    })

    /**
     * Function
     */
    const changeThemes = (key) => {
      // TODO 写入数据库
      store.commit('updateTheme', key)
      message.info(`已切换至主题：${String(key)}`)
    }

    const updateCurrentTime = () => {
      state.time = dateParsing.dateFormat(new Date(), 'HH:mm:ss')
    }

    const rushHome = () => {
      location.reload()
    }

    const toGit = () => {
      window.open('https://github.com/JiuMu-i/JiuMu', '_blank')
    }

    /**
     * watch
     */
    watch(_sharedTheme, (from, to) => {
      state.background = to.background
      state.paragraph = to.paragraph
      state.button = to.button
      state.buttonText = to.buttonText
      state.stroke = to.stroke
      state.strokeTranslucent = to.strokeTranslucent
      state.tertiary = to.tertiary
      state.loginModal.background = to.cardBackground
    })

    /**
     * onMounted
     */
    onMounted(() => {
      setInterval(updateCurrentTime, 1000)
    })

    return {
      ...toRefs(state),
      changeThemes,
      rushHome,
      toGit
    }
  }
}
</script>

<style lang="scss" scoped>
.nav {
  position: fixed;
  width: 100%;
  height: 30px;
  background-color: v-bind(background);
  border-bottom: 1px solid v-bind(strokeTranslucent);
  .nav-bar {
    width: 92%;
    height: 100%;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 18% 55% auto;
    .logo-bar {
      display: flex;
      align-items: center;
      .logo {
        font-family: 'HFBest-Wishes-2';
        font-size: 18px;
        color: v-bind(paragraph);
        cursor: pointer;
      }
    }
    .nav-items-bar {
      display: grid;
      grid-template-columns: 8% 8% 8% 8% auto;
      place-items: center;
      column-gap: 2%;
      .items {
        // 反向过渡
        transition-property: color;
        transition-duration: 1s;
        font-size: 16px;
        color: v-bind(paragraph);
        letter-spacing: 2px;
        cursor: pointer;
        &:hover {
          // 正向过渡
          transition-property: color;
          transition-duration: 300ms;
          color: v-bind(button);
        }
      }
      .search-item {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        width: 100%;
        height: 100%;
      }
    }
    .other-bar {
      display: grid;
      grid-template-columns: 40% 20% 20% 20%;
      align-items: center;
      justify-items: center;
      .calendar-item {
        display: grid;
        grid-template-rows: 50% 50%;
        justify-items: center;
        color: v-bind(paragraph);
        .time-item {
          font-size: 16px;
          font-weight: bold;
        }
      }
      .github {
        color: v-bind(button);
        cursor: pointer;
      }
      .avatar {
        color: v-bind(button);
        cursor: pointer;
      }
    }
  }
}
</style>
