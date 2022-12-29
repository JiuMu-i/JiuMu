<template>
  <div class="tem-search">
    <input
        type="text"
        placeholder="Search"
        class="search" />
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue'

export default {
  name: 'Search',
  props: {
    borderBottomColorPre: {
      type: String,
      default: () => "#999999"
    },
    borderBottomColorSuf: {
      type: String,
      default: () => "#899806"
    },
    textColor: {
      type: String,
      default: () => "#068798"
    }
  },
  setup () {
    const state = reactive({})

    return {
      ...toRefs(state)
    }
  }
}
</script>

<style lang="scss" scoped>
.tem-search {
  .search {
    width: 0.8rem;
    height: 0.18rem;
    color: v-bind(textColor);
    background-color: transparent;
    padding-left: 12px;
    border-top: none;
    border-right: none;
    border-left: none;
    border-bottom: 1px solid v-bind(borderBottomColorPre);
    transition-property: border-bottom, width;
    transition-duration: 500ms;
    &:hover {
      transition-property: border-bottom;
      transition-duration: 500ms;
      border-bottom: 1px solid v-bind(borderBottomColorSuf);
    }
    &:focus {
      outline: 0;
      border-top: none;
      border-right: none;
      border-left: none;
      transition-property: border-bottom, width;
      transition-duration: 500ms;
      border-bottom: 1px solid v-bind(borderBottomColorSuf);
      width: 2.8rem;
    }
  }
}
</style>
