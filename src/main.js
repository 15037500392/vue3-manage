import { createApp } from 'vue'
import { createPinia } from 'pinia'

import 'virtual:windi.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'
import 'virtual:windi.css'
import './assets/main.css'
import "./permission.js"
import "nprogress/nprogress.css"

const app = createApp(App)

app.use(ElementPlus)
app.use(createPinia())
app.use(router)

app.mount('#app')
