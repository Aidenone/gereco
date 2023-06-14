<script>
import axios from "axios"
import { set } from 'idb-keyval';

export default {
    name: 'LoginForm',
    data() {
        return {
            resp: '',
            nom: '',
            password: '',
            erreur: false
        };
    },
    mounted () {
    },
    methods: {
		getFormValues() {
			const content = {
								login: this.nom,
								password: this.password,
							};
			console.log(content);
			axios.post(this.currIp+"/login", content).then((response) => {
				if (typeof response.data['Tech_id'] !== 'undefined') {
					set('current_tech', response.data['Tech_id']);
					this.$router.push('/');
				} else {
					this.erreur = true;
				}
			});
		}
	}
};

</script>

<template>
<img src="../assets/logo-gereco.svg" style="width: 60px; margin: 10px;">
	<div class="login">
		<form @submit.prevent="getFormValues">
			<h2>Connexion :</h2>
			<div v-if="this.erreur" style="color: red;">Login ou Mot de passe invalide</div>
			<label for="nom">Nom :</label>
			<input type="text" name="nom" v-model="nom">
			<label for="password">Mot de passe :</label>
			<input type="password" name="password" v-model="password">
			<input class="input_button" type="submit" value="VALIDER">
		</form>
	</div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
	.login form {
		display: flex;
		flex-direction: column;
	}
	.login .input_button {
		margin-top: 30px;
	}
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
