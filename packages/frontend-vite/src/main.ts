import 'reflect-metadata'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import { VuesticPlugin } from 'vuestic-ui'
import 'vuestic-ui/dist/vuestic-ui.css'
import './main.scss'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import 'codemirror-editor-vue3/dist/style.css'
import 'codemirror/mode/javascript/javascript.js'

const app = createApp(App)
app.use(VuesticPlugin, {
  colors: {
    primary: '#1e40af',
    success: '#065f46',
  },
  components: {
    VaButton: {
      rounded: false,
      color: '#000000'
    }
  }
})
app.provide('$vaToast', app.config.globalProperties.$vaToast)
app.use(router)
app.mount('#app')
