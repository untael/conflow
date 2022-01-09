import { PanelNames } from '@/components/panels'
import { ComponentPropsOptions } from 'vue'

interface IPanel {
  name: PanelNames | string,
  minimized: boolean,
  component: any | null,
  props: ComponentPropsOptions,
  ancestor?: any,
}

export default class Panel implements IPanel {
  name: PanelNames | string = ''
  minimized: boolean = false
  component: any | null = null
  props: ComponentPropsOptions = {}

  constructor (data: Partial<Panel>) {
    Object.assign(this, data)
  }
}
