import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'

let app = createApp(App)
app.config.globalProperties.currIp = 'https://ns3359877.ip-37-187-97.eu'
app.use(router).mount('#app')