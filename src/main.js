import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import { VueSignaturePad } from 'vue-signature-pad';
import axios from "axios"
import { get, keys, del, set, entries } from 'idb-keyval';


let app = createApp(App)
app.config.globalProperties.currIp = 'http://ns3203483.ip-37-187-96.eu/index.php'
app.component("VueSignaturePad", VueSignaturePad);
app.use(router).mount('#app')

async function checkDP() {

	let current_tech = await get('current_tech');
    if (typeof current_tech == 'undefined') {
        console.log('No tech ID. Please Log in.');
    } else {
        const sendGetRequest = async () => {
            try {
                const response = await axios.get('http://ns3203483.ip-37-187-96.eu/index.php/my_missions?tech_id='+current_tech);
                this.resp = response.data;

                //del old tasks

                const ks = await keys();
                var task_tab = [];
                for (const k of ks) {
                    if (k.includes("-task")) {
                        task_tab.push(k);
                        del(k);
                    }
                }

                this.resp.forEach(async function(element) {
                    var id = element.Item_id;
                    var type = element.Item_type;
                    element = JSON.stringify(element);
                    var data = JSON.parse(element);
                    var name = type+'-'+id+'-task';

                    //Si nouvelle tâche et DP -> Notif
                    if(!task_tab.includes(name) && type == 'DP') {
						navigator.serviceWorker.register('service-worker.js');
						if (Notification.permission === "granted") {
							navigator.serviceWorker.ready.then(function(registration) {
								registration.showNotification('Vous avez une nouvelle DP');
							});
						}
                    }

                    //set new tasks
                    await set(name, data);
                });
            } catch (err) {
                console.error(err);
            }
        };
        await sendGetRequest();

        // get tasks from cache
        var data_tasks = [];
        var cache_entries = await entries();
        for (var i = 0; i <= cache_entries.length - 1; i++) {
            if (cache_entries[i][0].toString().includes("-task")) {

                //add formated_date
                var dateParts = cache_entries[i][1]["Evt_dtDebut"].split(" ");
                dateParts = dateParts[1].split("/");
                var dateObject = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
                cache_entries[i][1]["unix_date"] = Date.parse(dateObject);
                data_tasks.push(cache_entries[i][1]);
            }
        }
        data_tasks.sort(function(a,b){return a["unix_date"] - b["unix_date"]});
        this.data_tasks = data_tasks;
    }

}
setInterval(checkDP, 2000);


// async function test() {
// 	const registration = await navigator.serviceWorker.ready;

// 	if("periodicSync" in registration) {
// 		// Background Periodic Sync functionality
// 		const periodicSync = registration.periodicSync;
// 		console.log(registration);
// 	}
// }
// test();
