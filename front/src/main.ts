import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'
import IconTemplate from '@/components/IconTemplate.vue'
import '@/styles/main.scss'
import store from '@/store'

const app = createApp(App)
app.use(ElementPlus)
app.use(router).mount('#app')
app.use(store)

const requireAll = (requireContext) => requireContext.keys().map(requireContext)
requireAll(require.context('@/assets/icons/', true, /\.svg$/))
app.component('IconTemplate', IconTemplate)
