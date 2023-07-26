<script>
import axios from "axios"
import { get } from 'idb-keyval';

export default {
    name: 'HelloWorld',
    data() {
        return {
            resp: '',
            currIp: this.currIp
        };
    },
    methods: {
    },
    async mounted () {
        let current_tech = await get('current_tech');
        if (typeof current_tech == 'undefined') {
            this.$router.push('/login/');
        } else {
            axios.get(this.currIp+'/my_missions?tech_id='+current_tech).then((response) => {
                this.resp = response.data;
                //ajouter les missions dans le cache
                    //mettre la date de création dans le cache pour la suppression
                    //Changer les trucs de base si l'inter existe deja
                        // trucs de base : date todo / reference si existe / adresse
                console.log(this.resp);
            });
        }
    },
};

</script>

<template>

<img src="../assets/logo-gereco.svg" style="width: 60px; float: left; margin: 10px;">
<div style='float: right; color: black; position: relative; margin-right: 7px; top: 23px; border: 1px solid black; padding: 4px; font-size: 13px;'><a href="/#/new_dp" style="color: black;">+ un dépannage</a></div>
  <div class="hello">
    <div class="color-legend">
        <div style="background: #82C0CC;">Visite Générale</div>
        <div style="background: #f69159;">Dépannage</div>
        <div style="background: #f6b553;">Visite Hebdo</div>
    </div>
    <li v-for="(item, index) in resp" v-bind:key="index">
        <div class="planning_elem dp_elem" v-if="item.Item_type === 'DP'">
            <div>
                <div id="planning_date">{{ item.Evt_dtDebut }}</div>
                <div id="planning_type">{{ item.Item_type }}</div>
            </div>
            <div>
                <div id="planning_ref">Référence :<br> {{ item.Item_reference }}</div>
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
                <div id="planning_ref">Référence :<br> {{ item.Item_reference }}</div>
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
                <div id="planning_ref">Référence :<br> {{ item.Item_reference }}</div>
                <div id="planning_adress">{{ item.Imm_1_adr }}<br>{{ item.Imm_CP}} - {{ item.Imm_ville }}</div>
            </div>
            <router-link v-bind:to="{ name: 'vh', query: { item_id: item.Item_id }}"><div class="buttonLink">Effectuer l'intervention <img src="../assets/fleche_blanc.svg"></div></router-link>
        </div>
    </li>
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
    .home {
        margin-top: 0px !important;
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
