import Panel from '@/api/Panel'

export const PanelsMixin = {
  props: {
    panel: {
      type: Panel,
      required: true,
    },
  },
}
