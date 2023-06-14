import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'

let app = createApp(App)
app.config.globalProperties.currIp = 'http://192.168.73.11:8000'
app.use(router).mount('#app')