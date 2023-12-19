<script>
import axios from "axios";
import { set, get } from 'idb-keyval';

export default {
    name: 'DPForm',
    data() {
		return {
			isShowPresta: false,
			dp_id: '',
            resp: '',
            DP_observations: '',
            DP_remarqueContractuelle: '',
            DP_remarqueInter: '',
            temps_passe: '',
			statut: '',
			image: '',
			signature: {
				image: '',
				data_arr: {}
			},
			raf_devis: false,
			acces_porte: '',
            inter_option: [],
			inter: [
				{
					inter_type: '',
					inter_lieu: '',
					inter_presta: '',
					inter_qty: '1'
				},
			],
			occupant: {},
			currIp: this.currIp
		};
	},
    async mounted () {
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
		this.dp_id = item_id;
		axios.get(this.currIp+'/mission_dp?item_id='+item_id).then((response) => {
			console.log(response);
			this.resp = response.data;
			axios.get(this.currIp+'/get_contrat_presta?ctr_id='+this.resp.Ctr_code).then((response) => {
				this.inter_option = response.data;
				console.log(this.inter_option);
			});
		});
		axios.get(this.currIp+'/dp_occ?dp_id='+item_id).then((response) => {
			this.occupant = response.data;
		});

		//get signature if exist
		let cache = await get('DP-'+this.dp_id);
		if(cache !== undefined 
			&& cache["signature"]["data_arr"] !== undefined
			&& Object.keys(cache["signature"]["data_arr"]).length > 0
		) {
			this.$refs.signaturePad.fromData(cache["signature"]["data_arr"]);
		}

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
		getFormValues() {
			const content = {
								DP_id: this.dp_id,
								DP_occ: this.occupant,
								DP_remarqueContractuelle: this.DP_remarqueContractuelle,
								DP_remarqueInter: this.DP_remarqueInter,
								DP_observations: this.DP_observations,
								temps_passe: this.temps_passe,
								statut: this.statut,
								acces_porte: this.acces_porte,
								raf_devis: this.raf_devis,
								inter: this.inter,
								signature: this.signature,
								image: this.image
							};
			console.log(content);
			if(confirm("TERMINER L'INTERVENTION. Vous allez envoyer les données au siège, vous ne pourrez plus accéder à cette DP.")){
				axios.post(this.currIp+"/submit_dp", content).then((response) => {
					console.log(response.data);
					if (response.status == 200) {
						this.$router.push('/');
					}
				});
			}
		},
		addItem() {
			if(this.inter[this.inter.length - 1] != undefined) {
				var current = this.inter[this.inter.length - 1];
				if(
					current.inter_type != '' &&
					current.inter_lieu != '' &&
					current.inter_presta != '' &&
					current.inter_qty != ''
				) {
					this.inter.push(
						{
							inter_type: '',
							inter_lieu: '',
							inter_presta: '',
							inter_qty: '1',
						}
					);
				} else {
					alert("Vous devez remplir l'intervention précédente avant d'en rajouter une nouvelle")
				}
			} else {
				this.inter.push(
					{
						inter_type: '',
						inter_lieu: '',
						inter_presta: '',
						inter_qty: '1',
					}
				);
			}
			this.saveFormData();
		},
		removeItem() {
			this.inter.pop();
			this.saveFormData();
		},
		async handleFiles(e) {
			var files = await e.target.files || await e.dataTransfer.files;
			var file = files[0];

			const reader = new FileReader();
			reader.onloadend = () => {
				// Use a regex to remove data url part
				const base64String = reader.result
					.replace('data:', '')
					.replace(/^.+,/, '');
				// Logs wL2dvYWwgbW9yZ...
				this.image = base64String;
				console.log(this.image);
				this.saveFormData();
			};
			reader.readAsDataURL(file);
		},
		async saveFormData() {
			//Data from table + form
			var result = this.$data;
			//To avoid cloning error
			result = JSON.stringify(result);
			var test = JSON.parse(result);
			await set('DP-'+this.dp_id, test);
		},
		async getFormData() {
			let savedData = await get('DP-'+this.dp_id);
			if(savedData !== undefined) {
				this.inter = savedData.inter;
				this.DP_remarqueInter = savedData.DP_remarqueInter;
				this.DP_remarqueContractuelle = savedData.DP_remarqueContractuelle;
				this.statut = savedData.statut;
				this.raf_devis = savedData.raf_devis;
				this.acces_porte = savedData.acces_porte;
				this.temps_passe = savedData.temps_passe;
				this.signature = savedData.signature;
				this.image = savedData.image;
				this.DP_observations = savedData.DP_observations;
			}
		},
	}
};

</script>

<template>
	<form @submit.prevent="getFormValues">
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
					<div style="background: white; padding: 2px; font-size: 25px; position: absolute; top: 25px; right: 25px;" @click="isShowPresta = false;">X</div>
				</div>
			</div>
			<div style="font-size: 19px; color:white; font-weight: bold;">DÉPANNAGE N° {{ resp.DP_id }}</div>
			<div style="font-size: 14px;color:white; font-weight: bold; margin-bottom: 20px;">{{ resp.Evt_dtDebut }}</div>
			<div class="form_bloc">
				<div class="form_bloc_title">Contrat</div>
				<div class="form_bloc_content">
					<div class="col">
						<div class="form_bloc_subtitle">Référence</div>
						<div>{{ resp.DP_reference }}</div>
					</div>
					<div class="col">
						{{ resp.Imm_1_adr }}<br>
						{{ resp.Imm_2_adr }}
					</div>
				</div>
			</div>

			<div class="form_bloc">
				<div class="form_bloc_title">Code</div>
				<div class="form_bloc_content">
					<div>{{resp.gardien_code}}</div>
				</div>
			</div>

			<div class="form_bloc">
				<div class="form_bloc_title">Ordre</div>
				<div class="form_bloc_content">
					<div class="col">
						<div class="form_bloc_subtitle">Date de l'ordre</div>
						<div>{{resp.DP_dateSaisie}}</div>
					</div>
					<div class="col">
						<div class="form_bloc_subtitle">Par</div>
						<div>{{resp.DP_DonneurOrdre}}</div>
					</div>
				</div>
			</div>
			<div class="form_bloc">
				<div class="form_bloc_title">Occupant</div>
				<div class="form_bloc_content table_container">
					<div class="recur_table">
						<table>
							<tr>
								<th>Nom</th>
								<th>Bât</th>
								<th>Esc</th>
							</tr>
							<tr>
								<td><input type="text" v-model="occupant.DPOC_occupant" @input="saveFormData(index)"></td>
								<td><input type="text" v-model="occupant.DPOC_bat" @input="saveFormData(index)"></td>
								<td><input type="text" v-model="occupant.DPOC_escalier" @input="saveFormData(index)"></td>
							</tr>
						</table>
						<table>
							<tr>
								<th>Et</th>
								<th>Pte</th>
								<th>Code</th>
							</tr>
							<tr>
								<td><input type="text" v-model="occupant.DPOC_etage" @input="saveFormData(index)"></td>
								<td><input type="text" v-model="occupant.DPOC_porte" @input="saveFormData(index)"></td>
								<td><input type="text" v-model="occupant.DPOC_codeAcces" @input="saveFormData(index)"></td>
							</tr>
						</table>
						<table>
							<tr>
								<th>Complément adresse</th>
								<th>Fixe</th>
								<th>Bureau</th>
								<th>Portable</th>
							</tr>
							<tr>
								<td>{{occupant.DPOC_adresse}}</td>
								<td>{{occupant.DPOC_tel1}}</td>
								<td>{{occupant.DPOC_tel2}}</td>
								<td>{{occupant.DPOC_tel3}}</td>
							</tr>
						</table>
						<input type="checkbox" :checked="occupant.DPOC_blnPresent == 1" name="blnPresent" disabled>
						<label for="blnPresent">Présent</label>
						<input type="checkbox" :checked="occupant.DPOC_blnCleLoge == 1" name="cleLoge" disabled>
						<label for="cleLoge">Clé loge</label>
					</div>
				</div>
			</div>

			<div class="form_bloc">
				<div class="form_bloc_title">Gardien</div>
				<div class="form_bloc_content table_container">
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
				</div>
			</div>

			<div class="form_bloc">
				<div class="form_bloc_title">Syndic/Gérant</div>
				<div class="form_bloc_content table_container">
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
			</div>

			<div class="form_bloc">
				<div class="form_bloc_title">Remarques (informations à modifier)</div>
				<div class="form_bloc_content">
					<textarea v-model="DP_remarqueContractuelle" @input="saveFormData(index)"></textarea>
				</div>
			</div>

			<div class="form_bloc">
				<div class="form_bloc_title">Objet de l'intervention</div>
				<div class="form_bloc_content">
					<div>{{ resp.objet_tvx }}</div>
				</div>
			</div>

			<div class="form_bloc">
				<div class="form_bloc_title">Remarque préliminaire</div>
				<div class="form_bloc_content">
					<div>{{ resp.remarque_preliminaire }}</div>
				</div>
			</div>
		</div>

		<div class="form_bloc intervention" style="margin-top: 40px;">
			<div class="form_bloc_title">Intervention</div>
			<div class="form_bloc_content">

				<div class="intervention_type">
					<div class="intervention_bloc">
						<table>
							<tr>
								<th>Lieu</th>
								<th>Famille</th>
								<th>Presta.</th>
								<th>Qté.</th>
							</tr>
							<tr v-for="(item, index) in inter" :key="index">
								<td>
									<select style="width: 50px;" v-model="item['inter_lieu']" @change="saveFormData(index)">
										<option></option>
										<option>WC</option>
										<option>WCLAVEMAIN</option>
										<option>Cuis.</option>
										<option>Ch</option>
										<option>SD</option>
										<option>SDLAVABO</option>
										<option>SDDOUCHE</option>
										<option>SDB</option>
										<option>SDBLAVABO</option>
										<option>SDBBAIGN</option>
										<option>SDBDOUCHE</option>
										<option>SDBBIDET</option>
										<option>VO</option>
										<option>Part.Comm.</option>
									</select>
								</td>
								<td>
									<select style="width: 75px;" v-model="item['inter_type']" @change="saveFormData(index)">
										<option></option>
										<option value="1">RA - Robinet arrêt</option>
										<option value="4">WC</option>
										<option value="3">ROB - Robinetterie</option>
										<option value="5">Parties communes</option>
									</select>
								</td>
								<td>
									<select v-model="item['inter_presta']" @change="saveFormData(index)" :disabled="item['inter_type'] != '' && item['inter_lieu'] != '' ? disabled : ''">
										<option v-for="key in inter_option['presta_fam' + item['inter_type']]" :key="key" :value="key.id">
											{{ key.libelle }}
										</option>
										<!-- <option value="199" v-if="item['inter_type'] == '1'">Prestation hors-contrat - RA</option>
										<option value="499" v-if="item['inter_type'] == '4'">Prestation hors-contrat - WC</option>
										<option value="399" v-if="item['inter_type'] == '3'">Prestation hors-contrat - ROB</option>
										<option value="599" v-if="item['inter_type'] == '5'">Prestation hors-contrat - GEN</option> -->
									</select>
								</td>
								<td>
									<input style="width: 15px;" type="number" v-model="item['inter_qty']" @input="saveFormData(index)" :disabled="item['inter_lieu'] != '' && item['inter_type'] != '' ? disabled : ''">
								</td>
							</tr>
						</table>

						<p>
							<label style="">Remarque si autre Lieu ou autre robinetterie: </label><br>
							<textarea v-model="DP_remarqueInter" @input="saveFormData(index)"></textarea>
						</p>

						<div class="more_inter_container"><a href="#" class="add-more-inter" @click.prevent="addItem">+</a></div>
						<div class="more_inter_container"><a href="#" class="add-more-inter" @click.prevent="removeItem">-</a></div>

					</div>
				</div>
			</div>
		</div>

		<div class="form_bloc intervention">
			<div class="form_bloc_title">Compte rendu / Commentaires :</div>
			<div class="form_bloc_content">
				<div id="intervention" style="margin-bottom: 20px;">
					<label>Accès porte</label>
					<select v-model="this.acces_porte" @change="saveFormData(index)" required>
						<option>Occupant</option>
						<option>Gardien</option>
						<option>Clé</option>
						<option>Absent</option>
						<option>Refus oral</option>
						<option>Avisé</option>
					</select>
				</div>
				<div style="margin-bottom: 20px;">
					<label>Observations :</label>
					<textarea v-model="DP_observations" @input="saveFormData(index)"></textarea>
				</div>
				<div id="intervention">
					<label>Statut intervention :</label>
					<select v-model="this.statut" @change="saveFormData(index)" required>
						<option>Clôturé</option>
						<option>En suspens</option>
					</select>
				</div>
				<div style="margin-bottom: 20px;">
					<input type="checkbox" name="checkbox_devis" v-model="this.raf_devis" @change="saveFormData(index)">
					<label for="checkbox_devis">Devis à faire</label><br>
				</div>
				<div style="margin-bottom: 20px;">
					<label>Temps passé (hors déplacement) :</label>
					<select v-model="this.temps_passe" @change="saveFormData(index)" required>
						<option value="15">15min</option>
						<option value="30">30min</option>
						<option value="45">45min</option>
						<option value="60">1h</option>
						<option value="75">1h15min</option>
						<option value="90">1h30min</option>
						<option value="105">1h45min</option>
						<option value="120">2h</option>
						<option value="135">2h15min</option>
						<option value="150">2h30min</option>
						<option value="165">2h45min</option>
						<option value="180">3h</option>
						<option value="195">3h15min</option>
						<option value="210">3h30min</option>
						<option value="225">3h45min</option>
						<option value="240">4h</option>
					</select>
				</div>
				<div style="margin-bottom: 20px;">
					<label>Photo de l'intervention :</label><br>
					<input type="file" id="image_upload" name="image" @change="handleFiles" accept="image/png, image/jpeg">
				</div>
				<img :src="'data:image/png;base64 ,' + this.image" v-if="this.image != ''" style="width: 60px; margin-bottom: 30px;">

				<label style="">Visa Gardien ou Représentant</label>
				<div>
					<VueSignaturePad @change="save" height="200px" style="width: 70%; margin: auto;" class="signaturePad" ref="signaturePad" :options="{ onBegin, onEnd }" />
					<div style="display: flex; justify-content: center;">
						<div @click="undo">Effacer</div>
					</div>
				</div>

			</div>
		</div>
		<input class="input_button" type="submit" value="TERMINER L'INTERVENTION" style="margin-top: 20px;">
	</form>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	body {
		padding: 0 !important;
		margin: 0 !important;
		font-size: 15px;
		color: black;
	}
	.invis {
		display: none;
	}
	.signaturePad {
		border: 1px solid black;
	}
	.form_header {
		background: #f69159;
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
		top: 10px;
		left: 10px;
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
		color: white;
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
    .more_inter_container {
		background: #a6e3fc;
		border-radius: 80px;
		border: 1px solid black;
		width: 20px;
		text-align: center;
		display: inline-block;
		margin-right: 5px;
		margin-bottom: 20px;
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
	} .recur_table input {
		width: auto;
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
	.more_inter_container a {
		color: black;
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
	table, td, th {
		border: 1px solid black;
		color: black;
	}

	table {
		width: 100%;
		border-collapse: collapse;
		margin-bottom: 10px;
	}
	.recur_table input[type=text]{
		width: 93%;
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
