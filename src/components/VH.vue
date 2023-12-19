<script>
import { set, get, del } from 'idb-keyval';
import axios from "axios";

export default {
  name: 'VH',
  data() {
    return {
      isShowGreen: true,
      isShowPresta: false,
      currIp: this.currIp,
      resp: '',
      vh_id: '',
      remarque: '',
      signature: {
		image: '',
		data_arr: {}
      },
      inter_option: [],
      appartements: [
		//ajouter tous les champs -> identiques que VGInter
        {
			num: '1',
			bat: '',
			nom: '',
			escalier: '',
			etage: '',
			porte: '',
			objet: '',
			signature: {
				image: '',
				data_arr: {}
			},
			temps_passe: '0',
			remarque_inter: '',
			statut: 'Clôturé',
			checkbox_devis: false,
			remarque: '',
			inter: [
				{
					inter_type: '',
					inter_lieu: '',
					inter_presta: '',
					inter_qty: '1',
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
  async mounted() {
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
	let cache = await get('VH-'+this.vh_id);

	//get signature if exist
	if(cache !== undefined 
		&& cache["signature"]["data_arr"] !== undefined
		&& Object.keys(cache["signature"]["data_arr"]).length > 0
	) {
		this.$refs.signaturePad.fromData(cache["signature"]["data_arr"]);
	}

    axios.get(this.currIp+'/mission_vh?item_id='+item_id).then((response) => {
		this.resp = response.data;
		axios.get(this.currIp+'/get_contrat_presta?ctr_id='+this.resp.Ctr_code).then((response) => {
			this.inter_option = response.data;
			this.getFormData();
		});
	});
	this.getFormData();
    window.addEventListener('beforeunload', this.saveFormData);
  },
  beforeUnmount() {
    window.removeEventListener('beforeunload', this.saveFormData);
  },
  methods: {
	undo() {
			this.$refs.signaturePad.clearSignature();
			this.save();
	},
	save() {
		const { data } = this.$refs.signaturePad.saveSignature();
		var sanitizedData = "";
		if(data) {
			sanitizedData = data.replace('data:', '').replace(/^.+,/, '');
		}
		const signData = this.$refs.signaturePad.toData();
		this.signature.image = sanitizedData;
		this.signature.data_arr = signData;
		this.saveFormData();
	},
	onEnd() {
		this.save();
	},
	async saveFormData(occ) {
		occ = occ+1;
		//Data from table + form
		var result = this.$data;
		var test = JSON.stringify(result);
		test = JSON.parse(test);
		if (isNaN(occ)) {
			let i = 1;

			while(await get('VH-'+this.vh_id+'-'+i)) {
				if(test.appartements[i-1] === undefined)
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
			this.compte_rendu = savedData.compte_rendu;
			this.signature = savedData.signature;
			this.temps_passe = savedData.temps_passe;
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
		var current = this.appartements[0];
		var curr_num = current.num;

		this.appartements.unshift(
			{
				num: Number(curr_num) + 1,
				bat: current.bat,
				nom: '',
				escalier: current.escalier,
				etage: current.etage,
				porte: '',
				suivi: '',
				signature: {
					image: '',
					data_arr: {}
				},
				remarque_inter: '',
				statut: 'Clôturé',
				remarque: '',
				inter: [
					{
						inter_type: '',
						inter_lieu: '',
						inter_presta: '',
						inter_qty: '1',
					},
				],
				temps_passe: '0',
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
			temps_passe: this.temps_passe,
			compte_rendu: this.compte_rendu,
			vh_id: this.vh_id,
			ctr_code: this.resp.Ctr_code,
			ctr_nature: this.resp.Ctr_nature,
			remarque: this.remarque,
			signature: this.signature
		};
		console.log(content);
		if(confirm("FINALISER LA VISITE. Vous allez envoyer les données au siège, vous ne pourrez plus accéder à cette VH.")){
			axios.post(this.currIp+'/submit_vh', content).then((response) => {
				console.log(response.data);
				if (response.status == 200) {
					this.$router.push('/');
				}
			});
		}
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
			<div style="background: white; padding: 2px; border: 1px solid black; position: absolute; right: 20px; top: 20px;" @click="isShowPresta = true">Prestations</div>
			<div style="padding-bottom: 20px; width: 100%; height: 600px; overflow-y: scroll; background: white; position: absolute; top: 0px;" :class="{'invis': !isShowPresta}">
				<h2>RA</h2>
				<div v-for="key in inter_option['presta_fam1']"  :key="key" :value="key.id">
					{{key.libelle}}
				</div>
				<h2>ROB</h2>
				<div v-for="key in inter_option['presta_fam3']"  :key="key" :value="key.id">
					{{key.libelle}}
				</div>
				<h2>WC</h2>
				<div v-for="key in inter_option['presta_fam4']"  :key="key" :value="key.id">
					{{key.libelle}}
				</div>
				<h2>Parties communes</h2>
				<div v-for="key in inter_option['presta_fam5']"  :key="key" :value="key.id">
					{{key.libelle}}
				</div>
				<div style="background: white; padding: 2px; font-size: 25px; position: absolute; top: 25px; right: 25px;" @click="isShowPresta = false">X</div>
			</div>
		</div>
		<div style="font-size: 19px; color:white; font-weight: bold;">VISITE HEBDOMADAIRE</div>
		<div style="font-size: 14px;color:white; font-weight: bold; margin-bottom: 20px;">{{ resp.Evt_dtDebut }}</div>
		<div class="form_bloc">
			<div class="form_bloc_title">Contrat</div>
			<div class="form_bloc_content">
				<div class="col">
					<div class="form_bloc_subtitle">Référence</div>
					<div>{{ resp.Evt_reference }}</div>
				</div>
				<div class="col">
					{{ resp.Imm_1_adr }}<br>
					{{ resp.Imm_2_adr }}
				</div>
			</div>
			<div class="form_bloc_title">Code</div>
			<div class="form_bloc_content">
				<div>{{resp.gardien_code}}</div>
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
							<td>{{ resp.Imm_nbCham }}</td>
							<td>{{ resp.Imm_nbWC }}</td>
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
							<th>Horaire</th>
						</tr>
						<tr>
							<td>{{resp.gardien_nom}}</td>
							<td>{{resp.gardien_adresse}}</td>
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
						<textarea disabled v-model="resp.VH_remarquePreliminaire" @input="saveFormData(index)" style="height: 70px;"></textarea>
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
	<div class="form_bloc vg" style="margin-top: 40px;">
		<div class="form_bloc_title">Interventions</div>
		<div class="form_bloc_content table_container" style="margin-bottom: 40px;">
			<div>
				<div @click="addItemAppartements" class="line_adder" style="margin-bottom: 10px;">+</div>
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
			</div>
		</div>

		<label style="font-weight: bold;">Visa Gardien ou Représentant</label>
		<div style="margin-bottom: 40px;">
			<VueSignaturePad @change="save" height="200px" class="signaturePad" ref="signaturePad" style="width: 70%; margin: auto;" :options="{ onBegin, onEnd }" />
			<div>
				<div @click="undo">Effacer</div>
			</div>
		</div>
	</div>

	<input style="" class="input_button" type="submit" value="FINALISER LA VISITE">
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
	.signaturePad {
		border: 1px solid black;
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
		background: #c2bdb9;
		width: 70%;
		color: black;
		border: 1px solid black;
		margin-bottom: 20px;
		height: 25px;
		font-size: 16px;
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