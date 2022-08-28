<template>
  <div class="cf-panel-wrapper h-full flex flex-col md:flex-row justify-center">
    <div class="flex-none bg-white md:hidden h-8 z-10 shadow">
      <va-tabs
          v-if="childPanels.length"
          color="primary"
          v-model="activePanelName"
          hide-slider
          center
      >
        <template #tabs>
          <va-tab
              :class="[
               activePanelName === panel.name ? 'text-blue-800': 'text-green-700',
              ]"
              :label="panel.name"
              :name="panel.name"
              icon="home"
          />
          <va-tab
              v-for="(panelName, index) in childPanelNames"
              :name="panelName"
              :key="index"
          >
            {{ panelName }}
          </va-tab>
          <va-tab
              class="bg-red-300"
              icon="clear_all"
              color="red"
              key="clear_all"
              @click="childPanels = []"
              label="Clear all"
          />
        </template>
      </va-tabs>
    </div>

    <div
        class="cf-panel-wrapper__panel cf-panel-wrapper__panel--main w-full max-w-screen-md md:max-w-screen-sm md:block md:mt-8"
        v-if="authRequired && !currentUser"
    >
      <cf-panel
          :panel="panel"
          :closeable="false"
          :minimizeable="false"
          :maximizeable="false"
      >
        <cf-auth-required-panel/>
      </cf-panel>
    </div>
    <template v-else>
      <div
          class="cf-panel-wrapper__panel cf-panel-wrapper__panel--main w-full max-w-screen-md md:max-w-screen-sm md:block md:mt-8"
          :class="[
            childPanels.length && activePanelName !== panel.name ? 'hidden' : 'block',
            childPanels.length ? 'md:w-5/12' : 'md:w-9/12 md:max-w-screen-md',
        ]"
      >
        <cf-panel
            :panel="panel"
            :closeable="false"
            :minimizeable="false"
            :maximizeable="false"
        >
          <component
              :is="panel.component"
              v-on="$attrs"
              v-bind="panel.props"
          />
        </cf-panel>
      </div>
      <div
          v-if="childPanels.length"
          class="cf-panel-wrapper__panel cf-panel-wrapper__panel--child flex md:w-5/12 max-w-screen-md md:max-w-screen-sm"
      >
        <template
            v-for="(childPanel, index) in childPanels"
            :key="`${childPanel.name}-${index}`"
        >
          <cf-panel
              :class="{
              'hidden': activePanelName !== childPanel.name || !childPanels.length,
              'w-10/12': childPanels.length > 1,
              'block': childPanels.length,
              'w-full': childPanels.length === 1,
            }"
              :panel="childPanel"
              :minimizeable="childPanels.length > 1"
          >
            <component :is="childPanel.component" v-on="$attrs" v-bind="childPanel.props"/>
          </cf-panel>
        </template>
        <div v-if="childPanels.length > 1" class="cf-panel-wrapper__bookmarks hidden md:block w-2/12">
          <div
              class="cf-panel-wrapper__bookmarks--ribbon mb-1 py-1 px-1 bg-white hover:bg-blue-300"
              v-for="panelName in childPanelNames"
              :key="panelName"
              :class="[activePanelName === panelName ? 'bg-blue-800 text-white hover:bg-blue-800' : '']"
              @click="activePanelName = panelName"
          >
            {{ panelName }}
          </div>
          <div class="cf-panel-wrapper__bookmarks--ribbon pb-1 px-1 bg-white text-center hover:bg-red-200" @click="childPanels = []">
            Close all
          </div>
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
import CfAuthRequiredPanel from '@/views/CfAuthRequiredPanel.vue'
import { useAuth } from '@/composables/useAuth'

export default {
  name: 'CfPanelWrapper',
  components: { CfAuthRequiredPanel, CfPanel },
  props: {
    panel: {
      type: Panel,
      required: true,
    },
    authRequired: {
      type: Boolean,
      default: false,
    },
  },
  setup (props: any) {
    const { $toast } = useToast()
    const { currentUser } = useAuth()
    const childPanels: Ref<Panel[]> = ref([])
    const activePanelName = ref(props.panel.name)
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
      if (!childPanels.value.length) {
        activePanelName.value = props.panel.name
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
      currentUser,
    }
  },

}
</script>

<style lang="scss">
.cf-panel-wrapper {
  &__bookmarks {

    &--ribbon {
      text-overflow: ellipsis;
      cursor: pointer;
      border-radius: 0 var(--va-button-square-border-radius) var(--va-button-square-border-radius) 0;
    }
  }

  &__panel {
    height: calc(100vh - var(--cf-header-height) - 36px);

    &--main {
    }

    &--child {
    }

    @media (min-width: 768px) {
      &--main, &--child {
        margin: 2rem .5rem 0 .5rem;
      }
    }
  }

  .va-tabs__slider-wrapper {
    display: none !important;
  }

  .va-tabs__wrapper {
    align-items: center;
  }

  .va-tabs__tabs {
    display: flex;
    align-items: center;
  }
}
</style>
