<template>
  <cf-panel-wrapper :panel="panel"/>
</template>

<script lang="ts">
import CfPanelWrapper from '@/components/layout/CfPanelWrapper.vue'
import { PanelList, PanelNames } from '@/components/panels'
import Panel from '@/api/Panel'

export default {
  name: 'CfQuestionEditPanelWrapper',
  components: {
    CfPanelWrapper,
  },
  setup () {
    const panel = PanelList.find((panel: Panel) => panel.name === PanelNames.DashboardPanel)
    return {
      panel,
    }
  },

}
</script>

<style lang="scss">

</style>
