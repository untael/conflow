import 'reflect-metadata'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import { VuesticPlugin } from 'vuestic-ui'
import 'vuestic-ui/dist/vuestic-ui.css'
import './main.scss'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

const app = createApp(App)
app.use(VuesticPlugin)
app.use(router)
app.mount('#app')
