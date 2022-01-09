<template>
  <div class="cf-panel md:my-4 md:mx-auto h-full border-0 flex flex-col relative">
    <div class="flex z-10 flex-none absolute cf-panel__controls">
<!--      <va-button v-if="minimizeable" size="small" class="ml-1 flex-none" flat icon="minimize" @click="$panel.minimize(panel)"/>-->
<!--      <va-button v-if="maximizeable" size="small" class="ml-1 flex-none" flat icon="open_in_full" @click="panels.maximize(panel)"/>-->
      <va-button v-if="closeable" size="small" class="ml-1 flex-none" flat icon="close" @click="$panel.close(panel)"/>
    </div>
    <slot/>
  </div>
</template>

<script lang="ts">
import Panel from '@/api/Panel'
import { usePanel } from '@/composables/usePanel'

export default {
  name: 'CfPanel',
  props: {
    panel: {
      type: Panel,
      required: true,
    },
    closeable: {
      type: Boolean,
      default: true,
    },
    minimizeable: {
      type: Boolean,
      default: true,
    },
    // maximizeable: {
    //   type: Boolean,
    //   default: true,
    // },
    minimized: {
      type: Boolean,
      default: false,
    },
  },
  setup () {
    const { $panel } = usePanel()

    return {
      $panel,
    }
  },
}
</script>

<style lang="scss">
.cf-panel {
  --va-collapse-solid-box-shadow: none;

  &__controls {
    top: var(--va-card-padding);
    right: var(--va-card-padding);
  }

  .va-collapse__body {
    border: 1px solid var(--va-collapse-solid-header-content-background-color);
  }
}
</style>
