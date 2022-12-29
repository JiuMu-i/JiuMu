<template>
  <div class="home"></div>
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
      background: _sharedTheme.background
    })

    /**
     * watch
     */
    watch(_sharedTheme, (from, to) => {
      state.background = to.background
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
}
</style>
