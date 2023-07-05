<script>
import { set, get, del } from 'idb-keyval';
import axios from "axios";

export default {
  name: 'VH',
  data() {
    return {
      vh_id: '',
      resp: '',
      remarque: '',
      inter_option: [],
      appartements: [
		//ajouter tous les champs -> identiques que VGInter
        {
			num: '1',
			nom: '',
			bat: '',
			escalier: '',
			etage: '',
			porte: '',
			suivi: '',
			temps_passe: '',
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
			verif_wc: false,
			verif_gen: false
		}
      ],
    };
  },
  mounted() {
    let uri = window.location.href.split('?');
	let vars = uri[1].split('&');
	let getVars = {};
	let tmp = '';
	vars.forEach(function(v) {
	tmp = v.split('=');
	if(tmp.length == 2)
		getVars[tmp[0]] = tmp[1];
	});
	let item_id = getVars['item_id'];
	this.vh_id = item_id;
    axios.get(this.currIp+'/mission_vh?item_id='+item_id).then((response) => {
		this.resp = response.data;
		axios.get(this.currIp+'/get_contrat_presta?ctr_id='+this.resp.Ctr_code).then((response) => {
			this.inter_option = response.data;
			console.log(this.inter_option);
			this.getFormData();
		});
	});
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
		var test = JSON.stringify(result);
		test = JSON.parse(test);
		if (isNaN(occ)) {
			let i = 1;
			while(await get('VH-'+this.vh_id+'-'+i)) {
				await del('VH-'+this.vh_id+'-'+i);
				i = i + 1;
			}
			i = 1;
			while(test.appartements[i-1]) {
				await set('VH-'+this.vh_id+'-'+i, test.appartements[i-1]);
				i = i + 1;
			}
		} else {
			await set('VH-'+this.vh_id+'-'+occ, test.appartements[occ-1]);
		}
		await set('VH-'+this.vh_id, test);
    },
	async getFormData() {
		let i = 1;
		let data = [];
		if(await get('VH-'+this.vh_id+'-'+i) !== undefined) {
			while(await get('VH-'+this.vh_id+'-'+i) !== undefined) {
				let savedData = await get('VH-'+this.vh_id+'-'+i);
				data[i-1] = savedData;
				i = i + 1;
			}
			this.appartements = data;
		}

		if(await get('VH-'+this.vh_id) !== undefined) {
			let savedData = await get('VH-'+this.vh_id);
			this.remarque = savedData.remarque;
		}
		this.saveFormData();
    },
    removeLine(index) {
		if(confirm("Voulez-vous supprimer cette ligne ?")){
			this.appartements.splice(index, 1);
			this.saveFormData();
		}
	},
    addItemAppartements() {
		var current = this.appartements[this.appartements.length - 1];
		var curr_num = current.num;

		this.appartements.push( 
		{
			num: Number(curr_num) + 1,
			bat: '',
			escalier: '',
			etage: '',
			porte: '',
			suivi: '',
			temps_passe: '',
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
			verif_wc: false,
			verif_gen: false
		}
		);
		this.saveFormData();
    },
	submitForm() {
		const content = {
			appartements: this.appartements,
			vh_id: this.vh_id,
			ctr_code: this.resp.Ctr_code,
			ctr_nature: this.resp.Ctr_nature,
			remarque: this.remarque
		};
		console.log(content);
		axios.post(this.currIp+'/submit_vh', content).then((response) => {
			console.log(response.data);
		});
		this.$router.push('/');
    },
  },
};
</script>

<template>
  <form @submit.prevent="submitForm">
	<div class="form_header">
		<div class="header_headline">
			<a href="/"><img class="return_button" src="../assets/fleche2_blanc.svg"></a>
			<img src="../assets/logo-gereco-2.svg">
		</div>
		<div style="font-size: 19px; color:white; font-weight: bold;">VISITE HEBDOMADAIRE</div>
		<div style="font-size: 14px;color:white; font-weight: bold; margin-bottom: 20px;">{{ resp.Evt_dtDebut }}</div>
		<div class="form_bloc">
			<div class="form_bloc_title">Contrat</div>
			<div class="form_bloc_content">
				<div class="col">
					<div class="form_bloc_subtitle">Référence</div>
					<div>14/0712</div>
				</div>
				<div class="col">
					{{ resp.Imm_1_adr }}<br>
					{{ resp.Imm_2_adr }}
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
							<td>{{ resp.Imm_nbLog }}</td>
							<td>{{ Imm_nbCham }}</td>
							<td>{{ Imm_nbWC }}</td>
							<td>{{ resp.nbLocComm }}</td>
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
							<td>{{resp.gardien_nom}}</td>
							<td>{{resp.gardien_adresse}}</td>
							<td>{{resp.gardien_code}}</td>
							<td>{{resp.gardien_HeuresLoge}}</td>
						</tr>
					</table>
					<table>
						<tr>
							<th>Fixe</th>
							<th>Portable</th>
						</tr>
						<tr>
							<td>{{resp.gardien_telephone}}</td>
							<td>{{resp.gardien_mobile}}</td>
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
								<td>{{resp.client_raisonSoc}}</td>
								<td>{{resp.client_tel1}}</td>
							</tr>
						</table>
					</div>
				</div>
				<div class="form_bloc_content table_container">
					<div class="form_bloc_title">Observations GERECO</div>
					<div class="form_bloc_content">
						<textarea disabled v-model="resp.VG_remarqueTech" @input="saveFormData(index)" style="height: 70px;"></textarea>
					</div>
				</div>
				<div class="form_bloc">
					<div class="form_bloc_title">Remarques (informations à modifier)</div>
					<div class="form_bloc_content">
						<textarea v-model="this.remarque" @input="saveFormData(index)"></textarea>
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
						<td style="text-align: center;" ><router-link v-if="this.vh_id" :to="{ name: 'VHInter', params: { id: vh_id }, query: {vhocc: index+1}}">--></router-link></td>
						<div @click="removeLine(index)" class="line_remover"> x </div>
					</tr>
				</table>
				<button @click="addItemAppartements">+</button>
			</div>
		</div>
	</div>

	<input style="background: #c2bdb9;
		width: 70%;
		border: 1px solid black;
		margin-bottom: 20px;
		height: 25px;
		color: black;" class="input_button" type="submit" value="TERMINER L'INTERVENTION">
  </form>
</template>

<style scoped>

	.green input, .green select {
		color: green;
	}
	.invis {
		display: none;
	}

	input, select {
		/*border: none;*/
	}

	body {
		padding: 0 !important;
		margin: 0 !important;
		font-size: 15px;
		color: black;
	}	
	.form_header { 
		background: #c2bdb9;;
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
		width: 25%;
	}
	.line_remover {
		color: red;
		border: none;
		width: 0px;
		text-align: center;
		margin: auto;
		padding-top: 6px;
		margin-left: 5px;
		cursor: pointer;
	} .line_remover:hover {
		color: #ff0000b8;
	}
	.line_adder {
		border: 1px solid black;
		border-radius: 3px;
		background: #8080802e;
		width: 20px;
		height: auto;
		text-align: center;
		cursor: pointer;
	} .line_adder:hover {
		background: #8080804d;
	}
	.filter_button {
		border: 1px solid black;
		width: 55px;
		text-align: center;
		font-weight: 400;
		font-size: 14px;
		display: inline-block;
		background: #e8e8e8;
		margin-left: 4px;
	}
	table, td, th {
		border: 1px solid black;
		color: black;
	}

	table {
		width: 100%;
		border-collapse: collapse;
		border: none;
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