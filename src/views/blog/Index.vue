<template>
  <div class="blog"></div>
</template>

<script>
import { reactive, toRefs } from 'vue'

export default {
  name: 'blogIndex',
  setup () {
    const state = reactive({})

    return {
      ...toRefs(state)
    }
  }
}
</script>

<style lang="scss" scoped></style>
