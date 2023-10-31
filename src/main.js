import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import { VueSignaturePad } from 'vue-signature-pad';

let app = createApp(App)
app.config.globalProperties.currIp = 'https://ns3359877.ip-37-187-97.eu'
app.component("VueSignaturePad", VueSignaturePad);
app.use(router).mount('#app')

// function checkDP() {
	//call api my_missions()
	//if a dp is not in cache send a notif AND PUT IT IN CACHE
// }

// setInterval(checkDP, 1000);