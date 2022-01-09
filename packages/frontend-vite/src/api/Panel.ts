import { PanelNames } from '@/components/panels'

interface IPanel {
  name: PanelNames | string,
  minimized: boolean,
  component: any | null,
  props: any,
  ancestor?: any,
}

export default class Panel implements IPanel {
  name: PanelNames | string = ''
  minimized: boolean = false
  component: any | null = null
  props: any = {}

  constructor (data: Partial<Panel>) {
    Object.assign(this, data)
  }
}
