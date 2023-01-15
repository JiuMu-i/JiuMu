<template>
  <div class="home">
    <div class="main-area">
      <div class="description-area">
        <span class="desc-text">Something should be written here</span>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, inject, watch } from 'vue'

export default {
  name: 'homeIndex',
  setup () {
    const _sharedTheme = inject('sharedTheme')
    const state = reactive({
      /**
       * Default theme
       * Color related
       */
      background: _sharedTheme.background,
      stroke: _sharedTheme.stroke,
      secondary: _sharedTheme.secondary,
      tertiary: _sharedTheme.tertiary
    })

    /**
     * watch
     */
    watch(_sharedTheme, (from, to) => {
      state.background = to.background
      state.stroke = to.stroke
      state.secondary = to.secondary
      state.tertiary = to.tertiary
    })

    return {
      ...toRefs(state)
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100vh;
  background-color: v-bind(background);
  .main-area {
    width: 100%;
    height: 100vh;
    .description-area {
      display: flex;
      justify-content: center;
      position: relative;
      width: 80%;
      height: 2rem;
      margin: 0 auto;
      top: 50%;
      transform: translateY(-50%);
      .desc-text {
        font-size: 0.45rem;
        font-weight: bold;
        background-image: linear-gradient(to right, v-bind(stroke), v-bind(secondary), v-bind(tertiary));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    }
  }
}
</style>
