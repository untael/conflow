<template>
  <div class="cf-panel-wrapper flex justify-center">
    <div class="cf-panel-wrapper__main-panel max-w-screen-md md:max-w-screen-sm mx-2">
      <cf-panel
          :panel="panel"
          :closeable="false"
          :minimizeable="false"
          :maximizeable="false"
      >
        <component :is="panel.component" v-on="$attrs" v-bind="panel.props"/>
      </cf-panel>
    </div>
    <template
        v-for="(childPanel, index) in childPanels"
        :key="`${childPanel.name}-${index}`"
    >
      <div
          class="cf-panel-wrapper__child-panel flex mx-2 max-w-screen-md md:max-w-screen-sm"
          :class="[activePanelName === childPanel.name ? '' : 'hidden']"
      >
        <cf-panel
            class="cf-panel-wrapper__child-panel__panel"
            :class="[childPanels.length > 1 ? '' : 'max-w-full w-full']"
            :panel="childPanel"
            :minimizeable="childPanels.length > 1"
        >
          <component :is="childPanel.component" v-on="$attrs" v-bind="childPanel.props"/>
        </cf-panel>
        <div class="cf-panel-wrapper__child-panel__bookmarks my-4">
          <div
              class="cf-panel-wrapper__child-panel__bookmarks--ribbon mb-1 py-1 px-1 bg-white hover:bg-blue-300 md:hidden"
              :class="[activePanelName === panel.name ? 'bg-blue-800 text-white hover:bg-blue-800' : '']"
              @click="activePanelName = panel.name"
          >
            {{ panel.name }}
          </div>
          <template v-if="childPanels.length > 1">
            <div
                class="cf-panel-wrapper__child-panel__bookmarks--ribbon mb-1 py-1 px-1 bg-white hover:bg-blue-300"
                v-for="panelName in childPanelNames"
                :key="panelName"
                :class="[activePanelName === panelName ? 'bg-blue-800 text-white hover:bg-blue-800' : '']"
                @click="activePanelName = panelName"
            >
              {{ panelName }}
            </div>
            <div class="cf-panel-wrapper__child-panel__bookmarks--ribbon pb-1 px-1 bg-white text-center hover:bg-red-200" @click="childPanels = []">
              Close all
            </div>
          </template>
        </div>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { computed, provide, Ref, ref } from 'vue'
import { PanelList, PanelNames } from '@/components/panels'
import { useToast } from '@/composables/useToast'
import Panel from '@/api/Panel'
import CfPanel from '@/components/layout/CfPanel.vue'

export default {
  name: 'CfPanelWrapper',
  components: { CfPanel },
  props: {
    panel: {
      type: Panel,
      required: true,
    },
  },
  setup () {
    const { $toast } = useToast()
    const childPanels: Ref<Panel[]> = ref([])
    const activePanelName = ref('')
    const minimize = (panel: Panel) => {
      panel.minimized = true
    }
    const maximize = (panel: Panel) => {
      panel.minimized = false
    }
    const close = (panel: Panel) => {
      const panelIndex = childPanels.value.findIndex((item: Panel) => item.name === panel.name)
      childPanels.value = childPanels.value.filter((item: Panel) => item.name !== panel.name)
      if (panelIndex > 0) {
        activePanelName.value = childPanels.value[panelIndex - 1].name
        return
      }
      if (panelIndex === 0 && childPanels.value.length > 0) {
        activePanelName.value = childPanels.value[0].name
        return
      }
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
        existingPanel.props = props
        activePanelName.value = existingPanel.name
        return
      }
      if (panel && !existingPanel) {
        panel.props = props
        childPanels.value.push(panel)
        activePanelName.value = panel.name
      }
    }
    const childPanelNames = computed(() => {
      return childPanels.value.map((panel: Panel) => panel.name)
    })
    provide('panels', {
      init: init,
      minimize: minimize,
      maximize: maximize,
      close: close,
    })
    return {
      activePanelName,
      childPanelNames,
      childPanels,
    }
  },

}
</script>

<style lang="scss">
.cf-panel-wrapper {
  height: calc(100vh - var(--cf-header-height) * 2);

  &__main-panel {
    transition: all 1s ease;
    max-width: 40% !important;
    width: 40% !important;
    flex: 1 0 auto !important;
  }

  &__child-panel {
    max-width: 40% !important;
    width: 40% !important;
    flex: 1 0 auto !important;

    &__panel {
      max-width: 80% !important;
      width: 80% !important;
    }

    &__bookmarks {
      max-width: 20%;
      width: 20%;

      &--ribbon {
        text-overflow: ellipsis;
        cursor: pointer;
        border-radius: 0 var(--va-button-square-border-radius) var(--va-button-square-border-radius) 0;
      }
    }
  }
}
</style>
