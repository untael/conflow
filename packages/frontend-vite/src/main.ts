import 'reflect-metadata'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import { createVuestic } from 'vuestic-ui'
import 'vuestic-ui/css'
// import { VuesticPlugin } from 'vuestic-ui'
// import 'vuestic-ui/dist/vuestic-ui.css'
import './main.scss'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import 'codemirror-editor-vue3/dist/style.css'
import 'codemirror/mode/javascript/javascript.js'
import mitt, { Emitter } from 'mitt'
import { Events } from '@/api/emitter'
//ToDo: create types
//@ts-ignore
import print from 'vue3-print-nb'

const app = createApp(App)
app.use(createVuestic(), {
  colors: {
    primary: '#1e40af',
    success: '#065f46',
  },
  components: {
    VaIcon: {
      sizesConfig: {
        defaultSize: 24,
        sizes: {
          small: 20,
          medium: 24,
          large: 32,
        },
      },
    },
    VaButton: {
      rounded: false,
      color: '#000000',
    },
  },
})
app.provide('$vaToast', app.config.globalProperties.$vaToast)
app.use(router)
app.use(print)
const emitter: Emitter<Events> = mitt<Events>()
app.provide('$emitter', emitter)

app.mount('#app')
