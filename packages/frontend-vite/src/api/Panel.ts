import { PanelNames } from '@/components/panels'

interface IPanel {
  name: PanelNames | string,
  minimized: boolean,
  component: any,
  props: any,
}

export default class Panel implements IPanel {
  name: PanelNames | string = ''
  minimized: boolean = false
  component: any = null
  props: any = {}

  constructor (data: Partial<Panel>) {
    Object.assign(this, data)
  }
}
