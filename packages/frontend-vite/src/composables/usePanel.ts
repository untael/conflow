import { inject } from 'vue'
import Panel from '@/api/Panel'
import { PanelNames } from '@/components/panels'

type PanelController = {
  init: (name: PanelNames, props?: any) => void
  minimize: (panel: Panel) => void
  maximize: (panel: Panel) => void
  close: (panel: Panel) => void
}
export const usePanel = () => {
  const $panel = inject('panels') as PanelController

  return {
    $panel,
  }
}
