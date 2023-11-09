import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import { VueSignaturePad } from 'vue-signature-pad';

let app = createApp(App)
app.config.globalProperties.currIp = 'https://ns3359877.ip-37-187-97.eu'
app.component("VueSignaturePad", VueSignaturePad);
app.use(router).mount('#app')

function checkDP() {
	// Notification.requestPermission().then((permission) => {
 //        console.log(permission);
 //        if (permission === "granted") {
 //            const notification = new Notification("Test", { body: "test notif" });
 //            console.log(notification);
 //        }
 //    });

    navigator.serviceWorker.register('service-worker.js');
	if (Notification.permission === "granted") {
		navigator.serviceWorker.ready.then(function(registration) {
			registration.showNotification('Notification with ServiceWorker');
		});
	} else {
		// We need to ask the user for permission
		Notification.requestPermission().then((permission) => {
			console.log(permission);
			if (permission === "granted") {
				navigator.serviceWorker.ready.then(function(registration) {
					registration.showNotification('Notification with ServiceWorker');
				});
			}
		});
	}
}
setInterval(checkDP, 4000);


// async function test() {
// 	const registration = await navigator.serviceWorker.ready;

// 	if("periodicSync" in registration) {
// 		// Background Periodic Sync functionality
// 		const periodicSync = registration.periodicSync;
// 		console.log(registration);
// 	}
// }
// test();
