<template>
  <cf-panel-wrapper v-if="panel" :panel="panel"/>
</template>

<script lang="ts">
import CfPanelWrapper from '@/components/layout/CfPanelWrapper.vue'
import { PanelList, PanelNames } from '@/components/panels'
import Panel from '@/api/Panel'
import { useUrl } from '@/composables/useUrl'

export default {
  name: 'CfInterviewProcessPanelWrapper',
  components: {
    CfPanelWrapper,
  },
  setup () {
    const { id } = useUrl()
    const panel = PanelList.find((panel: Panel) => panel.name === PanelNames.InterviewProcessPanel)
    if (panel && id.value) {
      panel.props.id = id.value
    }
    return {
      panel,
    }
  },

}
</script>

<style lang="scss">

</style>
