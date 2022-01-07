<template>
  <div class="cf-panel-wrapper flex justify-evenly mx-5">
    <div
        class="cf-panel-wrapper__main-panel max-w-screen-lg px-2"
        :class="[!childPanels.length ? 'max-w-screen-md': 'max-w-screen-md']"
    >
      <cf-panel
          :panel="panel"
          :closeable="false"
          :minimizeable="false"
          :maximizeable="false"
      >
        <component :is="panel.component" v-on="$attrs" v-bind="panel.props"/>
      </cf-panel>
    </div>
    <div
        v-for="(panel, index) in childPanels"
        :key="`${panel.name}-${index}`"
        class="cf-panel-wrapper__child-panel max-w-screen-lg px-2"
    >
      <cf-panel :panel="panel" :minimizeable="childPanels.length > 1">
        <component :is="panel.component" v-on="$attrs" v-bind="panel.props"/>
      </cf-panel>
    </div>
  </div>
</template>

<script lang="ts">
import { provide, Ref, ref } from 'vue'
import { PanelList, PanelNames } from '@/components/panels'
import { PanelsMixin } from '@/router/PanelsMixin'
import { useToast } from '@/composables/useToast'
import Panel from '@/api/Panel'
import CfPanel from '@/components/layout/CfPanel.vue'

export default {
  name: 'CfPanelWrapper',
  components: { CfPanel },
  mixins: [PanelsMixin],
  setup () {
    const { $toast } = useToast()
    const childPanels: Ref<Panel[]> = ref([])
    const minimize = (panel: Panel) => {
      panel.minimized = true
    }
    const maximize = (panel: Panel) => {
      panel.minimized = false
    }
    const close = (panel: Panel) => {
      childPanels.value = childPanels.value.filter((item: Panel) => item.name !== panel.name)
    }
    const init = (name: PanelNames, props: any) => {
      const panel = PanelList.find((panel: Panel) => panel.name === name)
      const existingPanel = childPanels.value.find((panel: Panel) => panel.name === name)
      if (!panel) {
        $toast.init({
          message: 'Sorry, panel does not exist',
          color: 'danger',
        })
        return
      }
      if (existingPanel) {
        console.log('existingPanel', existingPanel)
        existingPanel.props = props
        // childPanels.value[existingPanel] = panel
        return
      }
      if (panel && !existingPanel) {
        panel.props = props
        childPanels.value.push(panel)
      }
    }
    provide('panels', {
      init: init,
      minimize: minimize,
      maximize: maximize,
      close: close,
    })
    return {
      childPanels,
    }
  },

}
</script>

<style lang="scss">
.cf-panel-wrapper {
  height: 95%;

  &__main-panel {
    transition: all 2s ease;
    max-width: 50%;
    width: 50%;
    flex: 1 0 auto !important;
  }

  &__child-panel {
    max-width: 50%;
    width: 50%;
    flex: 1 0 auto !important;
  }
}

.panels-enter-active, .panels-leave-active {
  transition: all 1s;
}

.panels-enter, .panels-leave-to /* .list-leave-active below version 2.1.8 */
{
  opacity: 0;
  transform: translateY(30px);
}
</style>
