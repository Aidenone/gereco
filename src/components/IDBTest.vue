<script>
import { set, get, del } from 'idb-keyval';
import axios from "axios";

export default {
  name: 'IDBTest',
  data() {
    return {
      isShowGreen: true,
      currIp: this.currIp,
      resp: '',
      vg_id: '',
      tech_id: '',
      date_enregistrement: '',
      compte_rendu: '',
      remarque: '',
      temps_passe: '',
      signature: {
		image: '',
		data_arr: {}
      },
      inter_option: [],
      compteurs: [
      ],
      appartements: [
        {
			num: '',
			bat: '',
			nom: '',
			escalier: '',
			etage: '',
			porte: '',
			suivi: '',
			signature: {
				image: '',
				data_arr: {}
			},
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
	this.vg_id = item_id;
	let cache = await get('VG-'+this.vg_id);

	let tech_id = await get('current_tech');
	this.tech_id = tech_id;

	//get signature if exist
	if(cache !== undefined 
		&& cache["signature"]["data_arr"] !== undefined
		&& Object.keys(cache["signature"]["data_arr"]).length > 0
	) {
		this.$refs.signaturePad.fromData(cache["signature"]["data_arr"]);
	}
	
    axios.get(this.currIp+'/mission_vg?item_id='+item_id)
    .then((response) => {
		this.resp = response.data;
		axios.get(this.currIp+'/get_contrat_presta?ctr_id='+this.resp.Ctr_code)
		.then((response) => {
			this.inter_option = response.data;
			this.getFormData();
		});
		axios.get(this.currIp+'/get_compteurs?ctr_id='+this.resp.Ctr_code)
		.then((response) => {
			let compteur_cache_current = false;
			for (let compteur of response.data) {
				if(cache) {
					let compteurs_cache = cache["compteurs"];
					if(compteurs_cache.length != 0) {
						for (let compteur_cache of compteurs_cache) {
							if(compteur_cache["id"] == compteur.Cpt_id) {
								compteur_cache_current = compteur_cache;
							}
						}
					}
				}
				
				if(!compteur_cache_current == false) {
					this.compteurs.push(
						{
							id: compteur_cache_current["id"],
							numero: compteur_cache_current["numero"],
							type: compteur_cache_current["type"],
							date: compteur_cache_current["date"],
							index: compteur_cache_current["index"],
							localisation: compteur_cache_current["localisation"],
							new: false
						}
					);
				} else {
					this.compteurs.push(
						{
							id: compteur.Cpt_id,
							numero: compteur.Cpt_numero,
							type: compteur.Cpt_nature,
							date: '',
							index: '',
							localisation: compteur.Cpt_localisation,
							new: false
						}
					);
				}
			}
			this.getFormData();
		});
	});
    window.addEventListener('beforeunload', this.saveFormData);
  },
  beforeUnmount() {
    window.removeEventListener('beforeunload', this.saveFormData);
  },
  methods: {
	undo() {
			this.$refs.signaturePad.undoSignature();
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
			while(await get('VG-'+this.vg_id+'-'+i)) {
				await del('VG-'+this.vg_id+'-'+i);
				i = i + 1;
			}
			i = 1;
			while(test.appartements[i-1]) {
				await set('VG-'+this.vg_id+'-'+i, test.appartements[i-1]);
				i = i + 1;
			}
		} else {
			await set('VG-'+this.vg_id+'-'+occ, test.appartements[occ-1]);
		}
		await set('VG-'+this.vg_id, test);
    },
    async getFormData() {
		let i = 1;
		let data = [];
		if(await get('VG-'+this.vg_id+'-'+i) !== undefined) {
			while(await get('VG-'+this.vg_id+'-'+i) !== undefined) {
				let savedData = await get('VG-'+this.vg_id+'-'+i);
				data[i-1] = savedData;
				i = i + 1;
			}
			this.appartements = data;
		}

		if(await get('VG-'+this.vg_id) !== undefined) {
			let savedData = await get('VG-'+this.vg_id);
			this.compte_rendu = savedData.compte_rendu;
			this.compteurs = savedData.compteurs;
			this.signature = savedData.signature;
			this.temps_passe = savedData.temps_passe;
			this.date_enregistrement = savedData.date_enregistrement,
			this.remarque = savedData.remarque;
		}
		this.saveFormData();
    },
    addItemAppartements() {
		var current = this.appartements[this.appartements.length - 1];
		var curr_num = current.num;

		this.appartements.push( 
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
		);

		this.saveFormData();
    },
    addItemCompteurs() {
		//mettre type en arg
		this.compteurs.push(
			{
				numero: '',
				type: '',
				date: '',
				index: '',
				localisation: '',
				new: true
			}
		);
		this.saveFormData();
	},
	removeItem(index, type) {
		this['inter_'+type].splice(index, 1);
		this.saveFormData();
	},
	removeLine(index) {
		if(confirm("Voulez-vous supprimer cette ligne ?")){
			this.appartements.splice(index, 1);
			this.saveFormData();
		}
	},
	removeCompteur(index) {
		if(confirm("Voulez-vous supprimer cette ligne ?")){
			this.compteurs.splice(index, 1);
			this.saveFormData();
		}
	},
	enregistrer() {
		const content = {
			appartements: this.appartements,
			compteurs: [],
			compte_rendu: this.compte_rendu,
			vg_id: this.vg_id,
			remarque: this.remarque,
			ctr_code: this.resp.Ctr_code,
			ctr_nature: this.resp.Ctr_nature,
			signature: this.signature
		};
		console.log(content);
		var today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth()+1; 
		var yyyy = today.getFullYear();
		var hh = today.getHours();
		var ll = today.getMinutes();

		if(dd<10)
			dd='0'+dd;
		if(mm<10)
			mm='0'+mm;
		if(ll<10)
			ll='0'+ll;

		today = dd+'-'+mm+'-'+yyyy+' '+hh+':'+ll;

		axios.post(this.currIp+"/submit_vg", content).then((response) => {
			console.log(response.data);
			if (response.status == 200) {
				this.date_enregistrement = today;
			}
			//else message d'erreur
		});
	},
	submitForm() {
		//format compteur date
		for (var i = 0; i < this.compteurs.length; i++) {
			if(this.compteurs[i].date !== '') {
				var datePart = this.compteurs[i].date.match(/\d+/g);
				var finalDate = datePart[2] + '/' + datePart[1] +'/'+ datePart[0];
				this.compteurs[i].date = finalDate;
			}
		}

		const content = {
			appartements: this.appartements,
			compteurs: this.compteurs,
			temps_passe: this.temps_passe,
			compte_rendu: this.compte_rendu,
			vg_id: this.vg_id,
			remarque: this.remarque,
			ctr_code: this.resp.Ctr_code,
			ctr_nature: this.resp.Ctr_nature,
			signature: this.signature,
			tech_id: this.tech_id
		};
		console.log(content);
		if(confirm("FINALISER LA VISITE. Vous allez envoyer les données au siège, vous ne pourrez plus accéder à cette VG.")){
			axios.post(this.currIp+"/submit_vg", content).then((response) => {
				console.log(response.data);
				if (response.status == 200) {
					this.$router.push('/');
				}
				//else message d'erreur
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
		</div>
		<div style="font-size: 19px; color:white; font-weight: bold;">VISITE GÉNÉRALE</div>
		<div style="font-size: 14px;color:white; font-weight: bold; margin-bottom: 20px;">{{ resp.Evt_dtDebut }}</div>
		<div class="form_bloc">
			<div class="form_bloc_title">Contrat</div>
			<div class="form_bloc_content">
				<div class="col">
					<div class="form_bloc_subtitle">Référence</div>
					<div>{{ resp.Evt_reference }}<span v-if="resp.Ctr_nature == 'P' || resp.Ctr_nature == 'B'"> - Cubage</span></div>
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
							<td>{{ resp.Imm_nbLocComm }}</td>
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
						<textarea disabled v-model="resp.VG_remarqueTech" @input="saveFormData(index)" style="height: 70px;"></textarea>
					</div>
				</div>

				<div class="form_bloc">
					<div class="form_bloc_title">Remarques (informations à modifier)</div>
					<div class="form_bloc_content">
						<textarea v-model="remarque" @input="saveFormData(index)"></textarea>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="form_bloc vg" style="margin-top: 40px;">
		<div class="form_bloc_title">Appartements <div class="filter_button" @click="isShowGreen = !isShowGreen">Filtrer</div></div>
		<div class="form_bloc_content table_container">
			<div>
				<table>
					<tr>
						<th>N°</th>
						<th>Bât.</th>
						<th>Esc.</th>
						<th>Et.</th>
						<th>Porte</th>
						<th>Suivi</th>
						<th>Modifier</th>
					</tr>
					<tr v-for="(item, index) in appartements" :key="index" :class="{ 'green': item.suivi != 'Abs.' && item.suivi != '', 'invis': item.suivi != 'Abs.' && item.suivi != '' && !isShowGreen}">
						<td>{{item.num}}</td>
						<td><input style="width: 25px;" type="text" v-model="item.bat" @input="saveFormData(index)" /></td>
						<td><input style="width: 25px;" type="text" v-model="item.escalier" @input="saveFormData(index)" /></td>
						<td><input style="width: 25px;" type="text" v-model="item.etage" @input="saveFormData(index)" /></td>
						<td><input style="width: 25px;" type="text" v-model="item.porte" @input="saveFormData(index)" /></td>
						<td>
							<select v-model="item.suivi" @change="saveFormData(index)" id="suivi">
								<option value="Occupant">Occupant</option>
								<option value="Abs.">Abs.</option>
								<option value="Abs. x2">Abs. x2</option>
								<option value="Gardien">Gardien</option>
								<option value="CLE">CLE</option>
								<option value="RO">RO</option>
								<option value="Avisé">Avisé</option>
							</select>
						</td>
						<td style="text-align: center;" ><router-link v-if="this.vg_id && item.suivi != 'Abs.' && item.suivi != 'Abs. x2' && item.suivi != 'RO' && item.suivi != 'Avisé' " :to="{ name: 'VGInter', params: { id: vg_id }, query: {vgocc: index+1}}">--></router-link></td>
						<div @click="removeLine(index)" class="line_remover"> x </div>
					</tr>
				</table>
				<div @click="addItemAppartements" class="line_adder">+</div>
			</div>
		</div>
	</div>
	<div class="save_button" style="margin-top: 20px;" @click="enregistrer">ENREGISTRER</div>
	<div>Dernier enregistrement : {{date_enregistrement}}</div>

	<div class="form_bloc compteurs" style="margin-top: 40px;">
		<div class="form_bloc_title">Compteurs</div>
		<div class="form_bloc_content table_container">
			<div>
				<table class="liste_vg">
					<tr>
						<th>Num</th>
						<th>Type</th>
						<th>Date</th>
						<th>Loc.</th>
						<th>Index</th>
					</tr>
					<tr v-for="(item, index) in compteurs" :key="index" class="vg-line">
						<td><input style="width: 70px;" type="text" v-model="item.numero" @input="saveFormData(index)" /></td>
						<td><input style="width: 28px;" type="text" v-model="item.type" @input="saveFormData(index)" /></td>
						<td><input style="width: 60px;" type="date" v-model="item.date" @input="saveFormData(index)" /></td>
						<td><textarea style="width: 40px;" v-model="item.localisation" @input="saveFormData(index)" ></textarea></td>
						<td><input style="width: 34px;" type="text" v-model="item.index" @input="saveFormData(index)" :disabled="item.date != '' ? disabled : ''"/></td>
						<div @click="removeCompteur(index)" class="line_remover"> x </div>
					</tr>
				</table>
				<div @click="addItemCompteurs" class="line_adder">+</div>
			</div>
		</div>
	</div>

	<div class="form_bloc" style="margin-top: 40px;">
		<p>
			<label style="font-weight: bold;">Compte-rendu: </label><br>
			<textarea v-model="this.compte_rendu" @input="saveFormData(index)"></textarea>
		</p>
		<div style="margin-bottom: 20px;">
			<label>Temps passé (hors déplacement)* :</label>
			<select v-model="this.temps_passe" @change="saveFormData(index)">
				<option value="1">1 jours</option>
				<option value="2">2 jours</option>
				<option value="3">3 jours</option>
				<option value="4">4 jours</option>
				<option value="5">5 jours</option>
				<option value="6">6 jours</option>
				<option value="7">7 jours</option>
				<option value="8">8 jours</option>
				<option value="9">9 jours</option>
				<option value="10">10 jours</option>
				<option value="11">11 jours</option>
				<option value="12">12 jours</option>
				<option value="13">13 jours</option>
				<option value="14">14 jours</option>
			</select>
		</div>
		
		<label style="">Visa Gardien ou Représentant</label>
		<div>
			<VueSignaturePad @change="save" height="200px" class="signaturePad" ref="signaturePad" :options="{ onBegin, onEnd }" />
			<div>
				<div @click="undo">Effacer</div>
			</div>
		</div>

	</div>
    
    <input class="input_button" type="submit" value="FINALISER LA VISITE" style="margin-top: 20px;">
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
		background: #81c0cc;
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
	.save_button {
		border: 1px solid black;
		width: fit-content;
		margin: auto;
		margin-bottom: 6px;
		padding: 6px;
		background: #a7e2fc;
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