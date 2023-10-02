<script>
import { set, get } from 'idb-keyval';

export default {
	name: 'VHInter',
	data() {
		return {
			vh_occ: '',
			vh_id: '',
			ctr_code: '',
			inter_option: [],
			appartements: 
			{
				num: '',
				nom: '',
				bat: '',
				escalier: '',
				etage: '',
				porte: '',
				objet: '',
				signature: {
					image: '',
					data_arr: {}
				},
				temps_passe: '',
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
		let item_id = getVars.vhocc;
		this.vh_occ = item_id;
		this.vh_id = this.$route.params.id;

		let cache = await get('VH-'+this.vh_id+'-'+this.vh_occ);

		//get signature if exist
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
			this.appartements.signature.image = sanitizedData;
			this.appartements.signature.data_arr = signData;
			this.saveFormData();
		},
		onEnd() {
			this.save();
		},
		async saveFormData() {
			//Data from table + form
			var result = this.$data;
			//To avoid cloning error
			result = JSON.stringify(result);
			var test = JSON.parse(result);
			await set('VH-'+this.vh_id+'-'+this.vh_occ, test.appartements);
		},
		async getFormData() {
			let savedData = await get('VH-'+this.vh_id+'-'+this.vh_occ);
			let vh_info = await get('VH-'+this.vh_id);
			this.inter_option = vh_info.inter_option;
			console.log(vh_info);
			this.appartements = savedData;
		},
		addItem() {
			if(this.appartements.inter[this.appartements.inter.length - 1] != undefined) {
				var current = this.appartements.inter[this.appartements.inter.length - 1];
				if(
					current.inter_type != '' &&
					current.inter_lieu != '' &&
					current.inter_presta != '' &&
					current.inter_qty != ''
				) {
					this.appartements.inter.push(
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
				this.appartements.inter.push(
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
			this.appartements.inter.pop();
			this.saveFormData();
		},
		submitForm() {
			this.getFormData();
		},
	},
};
</script>

<template>
	<form @submit.prevent="submitForm">
		<div class="form_header">
			<div class="header_headline">
				<a v-bind:href="'/#/vh/?item_id=' + this.vh_id"><img class="return_button" src="../assets/fleche2_blanc.svg"></a>
				<img src="../assets/logo-gereco-2.svg">
			</div>
			<div style="font-size: 19px; color:white; font-weight: bold;">VISITE HEBDOMADAIRE</div>
			<div style="font-size: 14px; color:white; font-weight: bold; margin-bottom: 20px;">N°{{vh_occ}}</div>
		</div>

		<table>
		<tr>
			<th>Nom</th>
			<th>Bât.</th>
			<th>Esc.</th>
			<th>Et.</th>
			<th>Porte</th>
			<th>Objet</th>
		</tr>
		<tr>
			<td>{{this.appartements.nom}}</td>
			<td>{{this.appartements.bat}}</td>
			<td>{{this.appartements.escalier}}</td>
			<td>{{this.appartements.etage}}</td>
			<td>{{this.appartements.porte}}</td>
			<td>{{this.appartements.objet}}</td>
		</tr>
      </table>

	<div class="checkbox_list" style="margin-bottom: 40px; margin-top: 40px;">
		<div class="form_bloc_title" style="color: black; margin-left: 20px;">Vérification</div>
		<input type="checkbox" name="checkbox_ra" v-if="this.inter_option['presta_fam1'] !== undefined && this.inter_option['presta_fam1'].length > 0" v-model="this.appartements.verif_ra" @change="saveFormData(index)">
		<label v-if="this.inter_option['presta_fam1'] !== undefined && this.inter_option['presta_fam1'].length > 0" for="checkbox_cloture">Vérification RA</label><br>

		<input type="checkbox" name="checkbox_rob" v-if="this.inter_option['presta_fam3'] !== undefined && this.inter_option['presta_fam3'].length > 0" v-model="this.appartements.verif_rob" @change="saveFormData(index)">
		<label v-if="this.inter_option['presta_fam3'] !== undefined && this.inter_option['presta_fam3'].length > 0" for="checkbox_cloture">Verification Robinetterie</label><br>

		<input type="checkbox" name="checkbox_wc" v-if="this.inter_option['presta_fam4'] !== undefined && this.inter_option['presta_fam4'].length > 0" v-model="this.appartements.verif_wc" @change="saveFormData(index)">
		<label v-if="this.inter_option['presta_fam4'] !== undefined && this.inter_option['presta_fam4'].length > 0" for="checkbox_cloture">Verification WC</label><br>

<!-- 		<input type="checkbox" name="checkbox_gen" v-model="this.appartements.verif_gen" @change="saveFormData(index)">
		<label for="checkbox_cloture">Verification Générique</label><br> -->
	</div>

	<div class="form_bloc intervention">
		<div class="form_bloc_title">Intervention</div>
		<div class="form_bloc_content" style="margin-bottom: 5px;">
			<div class="intervention_type">
				<div class="intervention_bloc">
					<table>
						<tr>
							<th>Lieu</th>
							<th>Famille</th>
							<th>Presta.</th>
							<th>Qté.</th>
						</tr>
						<tr v-for="(item, index) in appartements.inter" :key="index">
							<td>
								<select style="width: 50px;" v-model="item['inter_lieu']" @change="saveFormData(index)">
									<option></option>
									<option>SDB</option>
									<option>WC</option>
									<option>Cuis.</option>
									<option>Ch.</option>
									<option>SD</option>
								</select>
							</td>
							<td>
								<select style="width: 75px;" v-model="item['inter_type']" @change="saveFormData(index)">
									<option></option>
									<option value="1">RA - Robinet arrêt</option>
									<option value="4">WC</option>
									<option value="3">ROB - Robinetterie</option>
									<option value="5">GENER - Générique</option>
								</select>
							</td>
							<td>
								<select v-model="item['inter_presta']" @change="saveFormData(index)" :disabled="item['inter_type'] != '' ? disabled : ''">
									<option v-for="key in inter_option['presta_fam' + item['inter_type']]"  :key="key" :value="key.id">
										{{key.libelle}}
									</option>
									<option value="991">Prestation hors-contrat</option>
								</select>
							</td>
							<td>
								<input style="width: 15px;" type="number" v-model="item['inter_qty']" @input="saveFormData(index)" :disabled="item['inter_lieu'] != '' && item['inter_type'] != '' ? disabled : ''">
							</td>
						</tr>
					</table>

					<div class="more_inter_container"><a href="#" class="add-more-inter" @click.prevent="addItem">+</a></div>
					<div class="more_inter_container"><a href="#" class="add-more-inter" @click.prevent="removeItem">-</a></div>

					<p style="margin-top: 7px;">
						<label style="">Remarque si autre Lieu ou autre Robinetterie: </label><br>
						<textarea v-model="this.appartements.remarque_inter" @input="saveFormData(index)"></textarea>
					</p>
				</div>
			</div>
		</div>
	</div>
	<div class="form_bloc intervention">
		<div class="form_bloc_title">Compte rendu / Commentaires :</div>
		<div class="form_bloc_content">
			<div class="checkbox_list">
				<label>Statut intervention :</label>
				<select class="select-status" v-model="this.appartements.statut" @change="saveFormData(index)" required>
					<option>Clôturé</option>
					<option>En suspens</option>
				</select>

				<input type="checkbox" name="checkbox_devis" v-model="this.appartements.checkbox_devis" @change="saveFormData(index)">
				<label for="checkbox_cloture">HC-Devis à faire</label>
			</div>
			<div style="margin-top: 5px;">
				<label>Observations :</label>
				<textarea v-model="this.appartements.remarque"></textarea>
			</div>
			<div>
				<label>Temps passé (hors déplacement)* :</label>
				<select v-model="this.appartements.temps_passe" @change="saveFormData(index)">
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

			<label style="">Visa Gardien ou Représentant</label>
			<div>
				<VueSignaturePad @change="save" height="200px" class="signaturePad" ref="signaturePad" :options="{ onBegin, onEnd }" />
				<div style="display: flex; justify-content: center;">
					<div @click="undo">Effacer</div>
				</div>
			</div>
		</div>
	</div>
	<a :href="'/#/vh/?item_id=' + this.vh_id" style="position: relative; top: 12px; background: #c2bdb9; color: white; padding: 10px; border-radius: 10px;">SAUVEGARDER</a>
	<div style="height: 30px; width: 40px;"></div>
	</form>
</template>

<style scoped>
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
    .select-status {
		margin-bottom: 20px;
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
		display: inline-block;
		margin-right: 5px;
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