<template>
  <div class="home-page">
    <component :is="navIndexComponent"></component>
    <component :is="homeIndexComponent"></component>
  </div>
</template>

<script>
import { defineAsyncComponent, markRaw, reactive, toRefs, watch, provide, ref } from 'vue'
import { useStore } from 'vuex'

function importComponent () {
  const defineNavIndex = defineAsyncComponent(() => import('../views/nav/Index.vue'))
  const defineHomeIndex = defineAsyncComponent(() => import('../views/home/Index.vue'))

  const markNavIndex = markRaw(defineNavIndex)
  const markHomeIndex = markRaw(defineHomeIndex)

  return { markNavIndex, markHomeIndex }
}

export default {
  name: 'HomePage',
  setup () {
    const components = importComponent()
    const store = useStore()
    const _sharedTheme = reactive({ target: store.state.theme })
    const state = reactive({
      navIndexComponent: components.markNavIndex,
      homeIndexComponent: components.markHomeIndex
    })

    /**
     * provide
     */
    provide('sharedTheme', _sharedTheme.target)

    /**
     * watch
     */
    watch(store.state.theme, (from, to) => {
      _sharedTheme.target = to
    })

    return {
      ...toRefs(state)
    }
  }
}
</script>

<style lang="scss" scoped></style>
