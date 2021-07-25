<template>
  <div>
    <div class="grid px-2 grid-cols-2" :class="{'pa-2':!dense}">
      <div class="text-sm" :class="[!dense ? 'text-lg font-bold' : '']">{{ computedTitle }}</div>

      <div v-if="!$slots.default">
        <div>
          <div class="text-right" :class="{'text-sm': dense}">{{ description }}</div>
        </div>
      </div>

      <div v-else>
        <slot/>
      </div>

    </div>

    <va-divider v-if="divided"/>
  </div>
</template>

<script lang="ts">
import { computed } from 'vue'

export default {
  name: 'CfInfoLine',
  props: {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    divided: {
      type: Boolean,
    },
    dense: {
      type: Boolean,
    },
  },
  setup (props: any) {
    const computedTitle = computed(() => {
      return `${props.title}:`
    })
    return {
      computedTitle,
    }
  },
}
</script>

<style lang="scss">

</style>
