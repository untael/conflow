<template>
  <div class="cf-panel md:my-4 md:mx-auto h-full border-0 flex flex-col relative">
    <div class="flex z-10 flex-none absolute cf-panel__controls">
      <!--      <va-button v-if="minimizeable" size="small" class="ml-1 flex-none" preset="secondary" icon="minimize" @click="$panel.minimize(panel)"/>-->
      <!--      <va-button v-if="maximizeable" size="small" class="ml-1 flex-none" preset="secondary" icon="open_in_full" @click="panels.maximize(panel)"/>-->
      <va-button v-print="printParams" @click="onBeforePrint" v-if="printable" size="small" class="ml-1 flex-none" preset="secondary" icon="print" :class="[isPrint ? 'hidden' : '']"/>
      <va-button v-if="closeable" size="small" class="ml-1 flex-none" preset="secondary" icon="close" @click="$panel.close(panel)" :class="[isPrint ? 'hidden' : '']"/>
    </div>
    <slot/>
  </div>
</template>

<script lang="ts">
import Panel from '@/api/Panel'
import { usePanel } from '@/composables/usePanel'
import { computed, onMounted, onBeforeUnmount, ref, reactive } from 'vue'

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
    printable: {
      type: Boolean,
      default: false,
    },
    // maximizeable: {
    //   type: Boolean,
    //   default: true,
    // },
    minimized: {
      type: Boolean,
      default: false,
    },
    index: {
      type: [String, Number],
      default: '',
    }
  },
  setup (props: any) {
    const { $panel } = usePanel()

    const panelName = computed(() => {
      return props.panel.name.replaceAll(' ', '') + props.index
    })

    const isPrint = ref(false)
    const onBeforePrint = () => {
      isPrint.value = true
    }

    const onAfterPrint = () => {
      isPrint.value = false
    }

    const printParams = reactive({
      id: panelName.value,
      closeCallback: onAfterPrint,
    })

    return {
      $panel,
      panelName,
      onBeforePrint,
      isPrint,
      printParams,
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
