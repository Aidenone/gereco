<script>
import axios from "axios"
import { get, clear, set, del, keys, entries } from 'idb-keyval';

export default {
    name: 'HelloWorld',
    data() {
        return {
            resp: '',
            data_tasks : '',
            currIp: this.currIp
        };
    },
    methods: {
        logout() {
            if(confirm("Êtes-vous sûr de vouloir vous déconnecter ? Vous perdrez votre avancement sur les tâches en cours.")){
                clear();
                this.$router.push('/login/');
            }
        },
        reloadPage() {
            window.location.reload();
        },
        notifyMe() {
          navigator.serviceWorker.register('service-worker.js');
          if (!("Notification" in window)) {
            // Check if the browser supports notifications
            alert("This browser does not support desktop notification");
          } else if (Notification.permission === "granted") {
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

          console.log(Notification.permission);

          // At last, if the user has denied notifications, and you
          // want to be respectful there is no need to bother them anymore.
        }
    },
    async mounted () {

        let current_tech = await get('current_tech');
        if (typeof current_tech == 'undefined') {
            this.$router.push('/login/');
        } else {
            const sendGetRequest = async () => {
                try {
                    const response = await axios.get(this.currIp+'/my_missions?tech_id='+current_tech);
                    this.resp = response.data;

                    //del old tasks
                    const ks = await keys();
                    for (const k of ks) {
                        if (k.toString().includes("-task")) {
                            del(k);
                        }
                    }

                    console.log(this.resp);

                    this.resp.forEach(async function(element) {
                        var id = element.Item_id;
                        var type = element.Item_type;
                        element = JSON.stringify(element);
                        var data = JSON.parse(element);

                        //set new tasks
                        await set(type+'-'+id+'-task', data);
                    });
                } catch (err) {
                    console.error(err);
                }
            };
            await sendGetRequest();

            //get tasks from cache
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
            
            console.log(data_tasks);
            data_tasks.sort(function(a,b){return a["unix_date"] - b["unix_date"]});
            this.data_tasks = data_tasks;
        }
    },
};

</script>

<template>

<img src="../assets/logo-gereco.svg" style="width: 60px; float: left; margin: 10px;" @click="reloadPage">
<div style="display: contents;" @click="reloadPage"><img src="../assets/reload.png" class="reload-button"></div>
<div style="display: contents;" @click="logout()"><img src="../assets/logout.png" class="logout-button"></div>
<div style='float: right; color: black; position: relative; margin-right: 7px; top: 23px; border: 1px solid black; padding: 4px; font-size: 13px;'><a href="/#/new_dp" style="color: black;">+ un dépannage</a></div>
  <div class="hello">
    <div class="color-legend">
        <div style="background: #82C0CC;">Visite Générale</div>
        <div style="background: #f69159;">Dépannage</div>
        <div style="background: #c2bdb9;">Visite Hebdo</div>
    </div>

    <!-- <button @click="notifyMe">Notify me!</button> -->

    <li v-for="(item, index) in data_tasks" v-bind:key="index">
        <div class="planning_elem dp_elem" v-if="item.Item_type === 'DP'">
            <div>
                <div id="planning_date">{{ item.Evt_dtDebut }}</div>
                <div id="planning_type">{{ item.Item_type }}</div>
            </div>
            <div>
                <div id="planning_ref">Référence :<br> {{ item.Evt_reference }} </div>
                <div id="planning_adress">{{ item.Imm_1_adr }}<br>{{ item.Imm_CP}} - {{ item.Imm_ville }}</div>
            </div>
            <div id="planning_object">Objet : {{ item.DP_objetIntervention }}</div>
            <router-link v-bind:to="{ name: 'DPForm', query: { item_id: item.Item_id }}"><div class="buttonLink">Effectuer l'intervention <img src="../assets/fleche_blanc.svg"></div></router-link>
        </div>

        <div class="planning_elem vg_elem" v-if="item.Item_type === 'VG'">
            <div>
                <div id="planning_date">{{ item.Evt_dtDebut }}</div>
                <div id="planning_type">{{ item.Item_type }}</div>
            </div>
            <div>
                <div id="planning_ref">Référence :<br> {{ item.Evt_reference }} </div>
                <div id="planning_adress">{{ item.Imm_1_adr }}<br>{{ item.Imm_CP}} - {{ item.Imm_ville }}</div>
            </div>
            <router-link v-bind:to="{ name: 'IDBTest', query: { item_id: item.Item_id }}"><div class="buttonLink">Effectuer l'intervention <img src="../assets/fleche_blanc.svg"></div></router-link>
        </div>

        <div class="planning_elem vh_elem" v-if="item.Item_type === 'VH'">
            <div>
                <div id="planning_date">{{ item.Evt_dtDebut }}</div>
                <div id="planning_type">{{ item.Item_type }}</div>
            </div>
            <div>
                <div id="planning_ref">Référence :<br> {{ item.Evt_reference }} </div>
                <div id="planning_adress">{{ item.Imm_1_adr }}<br>{{ item.Imm_CP}} - {{ item.Imm_ville }}</div>
            </div>
            <router-link v-bind:to="{ name: 'vh', query: { item_id: item.Item_id }}"><div class="buttonLink">Effectuer l'intervention <img src="../assets/fleche_blanc.svg"></div></router-link>
        </div>
    </li>
  </div>
  <div class="version">v W1.2.6</div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
    .home {
        margin-top: 0px !important;
    }
    .version {
        margin-top: 15px;
        font-size: 12px;
    }
    .logout-button {
        width: 20px;
        position: relative;
        top: 27px;
        left: 55px;
    }
    .reload-button {
        width: 20px;
        position: relative;
        top: 27px;
        left: -70px;
    }
    .color-legend {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        width: 97%;
        margin: auto;
        margin-bottom: 15px;
    }
    .color-legend > div {
        width: 30%;
        text-align: center;
        font-size: 15px;
        padding: 5px;
        color: black;
    }
    li {
       list-style-type: none; 
    }
    .vg_elem.planning_elem {
        background: #81c0cc !important;
    } .vh_elem.planning_elem {
        background: #c2bdb9 !important;
    } .planning_elem {
        width: 95%;
        margin: auto;
        margin-top: 20px;
        background: #f69159;
        color: black;
        padding: 5px;
        border-radius: 10px;
        position: relative;
        display: flex;
        flex-direction: column;
        font-size: 13px;
        padding: 8px;
    } .planning_elem > div {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        margin-bottom: 9px;
    }
    #planning_ref, #planning_adress {
        text-align: left;
    }
    #planning_date, #planning_type {
        font-weight: bold;
    }
    #planning_object {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    #planning_ref, #planning_adress {
        width: 50%;
    }
    #planning_button {
        color: black;
    }

    .vg_elem .buttonLink {
        color: #81c0cc !important;
    } .vg_elem .buttonLink img {
        background: #81c0cc !important;
    }

    .vh_elem .buttonLink {
        color: #c2bdb9 !important;
    } .vh_elem .buttonLink img {
        background: #c2bdb9 !important;
    }

    .buttonLink {
        border-radius: 17px;
        background: white;
        text-align: left;
        width: 240px;
        margin: auto;
        font-weight: bold;
        margin-top: 5px;
        margin-bottom: 5px;
        height: 35px;
        display: flex;
        padding: 0px 5px 0 10px;
        align-items: center;
        justify-content: space-between;
        color: #f69159;
    } .buttonLink img {
        height: 14px;
        width: 14px;
        border-radius: 100px;
        padding: 6px;
        background: #f69159;
    }
    a {
        text-decoration: none;
    }
</style>
