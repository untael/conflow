<template>
  <cf-panel-wrapper :panel="panel"/>
</template>

<script lang="ts">
import CfPanelWrapper from '@/components/layout/CfPanelWrapper.vue'
import { PanelList, PanelNames } from '@/components/panels'
import Panel from '@/api/Panel'

export default {
  name: 'CfQuestionsDashboardPanelWrapper',
  components: {
    CfPanelWrapper,
  },
  props: {
    editable: {
      type: Boolean,
      default: false,
    },
    addable: {
      type: Boolean,
      default: false,
    },
  },
  setup (props: any) {
    const panel = PanelList.find((panel: Panel) => panel.name === PanelNames.QuestionsDashboardPanel)
    if (panel) {
      panel.props = props
    }
    return {
      panel,
    }
  },

}
</script>

<style lang="scss">

</style>
