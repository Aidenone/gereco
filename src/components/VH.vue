<template>
  <form @submit.prevent="submitForm">
	<div class="form_header">
		<div class="header_headline">
			<a href="/"><img class="return_button" src="../assets/fleche2_blanc.svg"></a>
			<img src="../assets/logo-gereco-2.svg">
		</div>
		<div style="font-size: 19px; color:white; font-weight: bold;">VISITE HEBDOMADAIRE</div>
		<div style="font-size: 14px;color:white; font-weight: bold; margin-bottom: 20px;">07/09/2023</div>
		<div class="form_bloc">
			<div class="form_bloc_title">Contrat</div>
			<div class="form_bloc_content">
				<div class="col">
					<div class="form_bloc_subtitle">Référence</div>
					<div>14/0712</div>
				</div>
				<div class="col">
					4/6/8 Emile Dubois
					<br>12 Dareau
					<br>75014 Paris
				</div>
			</div>
			<div class="form_bloc_content table_container">
				<div>
					<table>
						<tr>
							<th>Nb Logt</th>
							<th>Nb Ch.</th>
							<th>Nb WC comm.</th>
							<th>Nb loc. comm.</th>
							
						</tr>
						<tr>
							<td>200</td>
							<td>8</td>
							<td>2</td>
							<td>Exclus</td>
						</tr>
					</table>
				</div>
			</div>
			<div class="form_bloc_content table_container">
				<div class="form_bloc_title">Gardien</div>
				<div class="recur_table">
					<table>
						<tr>
							<th>Nom</th>
							<th>Adresse loge</th>
							<th>Code</th>
							<th>Horaire</th>
						</tr>
						<tr>
							<td>Mr Jean</td>
							<td>
								12 rue Jean Jaures
								<br>5014 Paris
							</td>
							<td></td>
							<td></td>
						</tr>
					</table>
					<table>
						<tr>
							<th>Fixe</th>
							<th>Portable</th>
						</tr>
						<tr>
							<td>01.17.18.82.19</td>
							<td>06.11.78.55.23</td>
						</tr>
					</table>
				</div>
				<div class="form_bloc_content table_container">
					<div class="form_bloc_title">Syndic / Gérant</div>
					<div class="recur_table">
						<table>
							<tr>
								<th>Nom</th>
								<th>Fixe</th>
							</tr>
							<tr>
								<td>Mr Jean</td>
								<td>01.14.75.29.49</td>
							</tr>
						</table>
					</div>
				</div>
				<div class="form_bloc_content table_container">
					<div class="form_bloc_title">Observations GERECO</div>
					<div class="form_bloc_content">
						<textarea disabled style="height: 70px;">Le 28/01 Bat A - Le 29/01 Bat B du 12e au 6e - Le 30/01 Bat B du 5e au rdc - le 3/02 B et C </textarea>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="form_bloc vg">
		<div class="form_bloc_title">Interventions</div>
		<div class="form_bloc_content table_container">
			<div>
				<table>
					<tr>
						<th>Nom</th>
						<th>Bât.</th>
						<th>Esc.</th>
						<th>Et.</th>
						<th>Pte</th>
						<th>Objet</th>
						<th>Modifier</th>
					</tr>
					<tr v-for="(item, index) in appartements" :key="index">
						<td><input style="width: 40px;" type="text" v-model="item.nom" @input="saveFormData(index)" /></td>
						<td><input style="width: 15px;" type="text" v-model="item.bat" @input="saveFormData(index)" /></td>
						<td><input style="width: 15px;" type="text" v-model="item.escalier" @input="saveFormData(index)" /></td>
						<td><input style="width: 15px;" type="text" v-model="item.etage" @input="saveFormData(index)" /></td>
						<td><input style="width: 15px;" type="text" v-model="item.porte" @input="saveFormData(index)" /></td>
						<td><input style="width: 40px;" type="text" v-model="item.objet" @input="saveFormData(index)" /></td>
						<td style="text-align: center;" ><router-link v-bind:to="{ name: 'VHInter', params: { id: '0001'}, query: {vgocc: index+1}}">--></router-link></td>
					</tr>
				</table>
				<button @click="addItemAppartements">+</button>
			</div>
		</div>
	</div>

	<a href="/" style="background: #c2bdb9;
		width: 70%;
		border: 1px solid black;
		margin-bottom: 20px;
		height: 25px;
		padding: 7px;
		color: black;">CLÔTURER LA VISITE HEBDOMADAIRE</a>
  </form>
</template>

<script>
import { set, get } from 'idb-keyval';

export default {
  name: 'VH',
  data() {
    return {
      appartements: [
		//ajouter tous les champs -> identiques que VGInter
        {
			num: '1',
			bat: '',
			escalier: '',
			etage: '',
			porte: '',
			suivi: '',
			remarque_inter: '',
			checkbox_cloture: false,
			checkbox_suspens: false,
			checkbox_devis: false,
			remarque: '',
			inter: [
				{
					inter_type: '',
					inter_lieu: '',
					inter_presta: '',
					inter_qty: '',
				},
			],
			verif_ra: false,
			verif_rob: false,
			verif_wc: false
		}
      ],
    };
  },
  mounted() {
    this.getFormData();
    // window.addEventListener('beforeunload', this.saveFormData);
  },
  beforeUnmount() {
    // window.removeEventListener('beforeunload', this.saveFormData);
  },
  methods: {
    async saveFormData(occ) {
		occ = occ+1;
		//Data from table + form
		var result = this.$data;
		//To avoid cloning error
		result = JSON.stringify(result);
		var test = JSON.parse(result);
		console.log("occ : "+occ);
		if (isNaN(occ)) {
			let i = 1;
			while(test.appartements[i-1]) {
				await set('VH-xxx-'+i, test.appartements[i-1]);
				console.log("test");
				i = i + 1;
			}
		} else {
			await set('VH-xxx-'+occ, test.appartements[occ-1]);
		}
    },
    async getFormData() {
		let i = 1;
		let data = [];
		if(await get('VH-xxx-'+i) !== undefined) {
			while(await get('VH-xxx-'+i) !== undefined) {
				let savedData = await get('VH-xxx-'+i);
				data[i-1] = savedData;
				i = i + 1;
			}
			this.appartements = data;
		}
    },
    addItemAppartements() {
		//mettre type en arg
		// this['inter_'+type].push({ name: "", email: ""});
		this.appartements.push( 
		{
			num: '1',
			bat: '',
			escalier: '',
			etage: '',
			porte: '',
			suivi: '',
			remarque_inter: '',
			checkbox_cloture: false,
			checkbox_suspens: false,
			checkbox_devis: false,
			remarque: '',
			inter: [
				{
					inter_type: '',
					inter_lieu: '',
					inter_presta: '',
					inter_qty: '',
				},
			],
			verif_ra: false,
			verif_rob: false,
			verif_wc: false
		}
		);
		this.saveFormData();
    },
	submitForm() {
		// const content = {
		// 	appartements: this.appartements
		// 	//id de la vh
		// };
		// console.log(content);
		// axios.post("http://192.168.1.143:8000/submit_vh", content).then((response) => {
		// 	console.log(response.data);
		// });
    },
  },
};
</script>

<style scoped>
	body {
		padding: 0 !important;
		margin: 0 !important;
		font-size: 15px;
		color: black;
	}	
	.form_header {
		background: #c2bdb9;
		width: 100%;
		padding-bottom: 15px;
		border-bottom-left-radius: 25px;
		border-bottom-right-radius: 25px;
		margin-bottom: 20px;
	}
	.header_headline > img {
		width: 50px;
		padding: 5px;
		margin-top: 35px;
		margin-bottom: 15px;
	}
	.header_headline > a {
		background: white;
		border-radius: 100px;
		padding: 10px;
		width: 20px;
		height: 20px;
		display: flex;
		justify-content: center;
		align-items: center;
		position: absolute;
		top: 15px;
		left: 15px;
    }
	.return_button {
		filter: brightness(0%);
	}
    .form_bloc.intervention .form_bloc_title {
		color: black !important;
    }
    .form_bloc.intervention .form_bloc_subtitle {
		color: black !important;
    }
    .form_bloc.intervention .form_bloc_content {
		flex-direction: column;
    }
    .form_bloc_title {
		font-weight: bold;
		color: black;
		text-align: left;
		font-size: 17px;
		margin-bottom: 8px;
    }
    .form_bloc {
		display: flex;
		flex-direction: column;
		width: 90%;
		margin: auto;
		margin-bottom: 15px;
		color: black;
    }
    .form_bloc_content {
		display: flex;
		flex-direction: row;
		text-align: left;
    } .form_bloc_content > div{
		margin-bottom: 10px;
    }
    .col {
		text-align: left;
		width: 50%;
    }
    .form_bloc_subtitle {
		color: white;	
	}
	.table_container {
		display: flex;
		flex-direction: column;
	}
	.recur_table {
		margin-bottom: 18px;
	}
	.intervention_bloc {
		width: 100%;
	}
	.intervention_type {
		width: 100%;
	}
	.intervention_title {
		font-weight: bold;
		font-size: 17px;
		margin-bottom: 10px;
		margin-right: 10px;
		margin-left: 10px;
	}
	.intervention_button {
		background: #f69159;
		border-radius: 80px;
		border: 1px solid black;
		width: 22px;
		position: relative;
		top: -1px;
	}
	.more_inter_container {
		background: #a6e3fc;
		border-radius: 80px;
		border: 1px solid black;
		width: 20px;
		text-align: center;
		margin-bottom: 30px;
	}
	.checkbox_list label {
		margin-right: 20px;
		position: relative;
		top: -1px;
	}
	.input_button {
		background: #a6e3fc;
		width: 70%;
		border: 1px solid black;
		margin-bottom: 20px;
		height: 25px;
	}
	.liste_vg th {
		width: 10px;
	}
	table, td, th {
		border: 1px solid black;
		color: black;
	}

	table {
		width: 100%;
		border-collapse: collapse;
		margin-bottom: 10px;
	}
	td, th {
		min-height: 10px;
		padding: 5px;
	}
	textarea {
		width: calc(100% - 6px);
	}
	select {
		width: 100%;
	}
</style>