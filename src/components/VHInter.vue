<template>
	<form @submit.prevent="submitForm">
		<div class="form_header">
			<div class="header_headline">
				<a href="/#/vh"><img class="return_button" src="../assets/fleche2_blanc.svg"></a>
				<img src="../assets/logo-gereco-2.svg">
			</div>
			<div style="font-size: 19px; color:white; font-weight: bold;">VISITE HEBDOMADAIRE - 07/09/2023</div>
			<div style="font-size: 14px; color:white; font-weight: bold; margin-bottom: 20px;">N°{{vg_occ}}</div>
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

	<div class="checkbox_list">
		<div class="form_bloc_title" style="color: black; margin-left: 20px;">Vérification</div>
		<input type="checkbox" name="checkbox_cloture" v-model="this.appartements.verif_ra" @change="saveFormData(index)">
		<label for="checkbox_cloture">Vérification RA</label><br>

		<input type="checkbox" name="checkbox_suspens" v-model="this.appartements.verif_rob" @change="saveFormData(index)">
		<label for="checkbox_cloture">Verification Robinetterie</label><br>

		<input type="checkbox" name="checkbox_devis" v-model="this.appartements.verif_wc" @change="saveFormData(index)">
		<label for="checkbox_cloture">Verification WC</label><br>
	</div>

	<div class="form_bloc intervention">
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
						<tr v-for="(item, index) in appartements.inter" :key="index">
							<td>
								<select style="width: 50px;" v-model="item['inter_lieu']" @change="saveFormData(index)">
									<option>SDB</option>
									<option>WC</option>
									<option>Cuis.</option>
									<option>Ch.</option>
									<option>SD</option>
								</select>
							</td>
							<td>
								<select style="width: 75px;" v-model="item['inter_type']" @change="saveFormData(index), changeFamily($event, index)">
									<option value="ra">RA - Robinet d'arrêt</option>
									<option value="wc">WC</option>
									<option value="robinetterie">R - Robinetterie</option>
									<option value="robinetterie commune">RC - Robinetterie commune</option>
								</select>
							</td>
							<td>
								<select v-model="item['inter_presta']" @change="saveFormData(index)" :disabled="item['inter_lieu'] != '' && item['inter_type'] != '' ? disabled : ''">
									<option v-for="key in item['inter_option']" :key="key">
										{{key}}
									</option>
									<option>Prestation hors-contrat</option>
								</select>
							</td>
							<td>
								<input style="width: 15px;" type="number" v-model="item['inter_qty']" @input="saveFormData(index)" :disabled="item['inter_lieu'] != '' && item['inter_type'] != '' ? disabled : ''">
							</td>
						</tr>
					</table>

					<div class="more_inter_container"><a href="#" class="add-more-inter" @click.prevent="addItem">+</a></div>
					<div class="more_inter_container"><a href="#" class="add-more-inter" @click.prevent="removeItem">-</a></div>

					<p>
						<label style="font-weight: bold;">Remarque si autre Lieu ou autre Robinetterie: </label><br>
						<textarea></textarea>
					</p>
				</div>
			</div>
		</div>
	</div>
	<div class="form_bloc intervention">
		<div class="form_bloc_title">Compte rendu / Commentaires :</div>
		<div class="form_bloc_content">
			<div class="checkbox_list">
				<input type="checkbox" name="checkbox_cloture" v-model="this.appartements.checkbox_cloture" @change="saveFormData(index)">
				<label for="checkbox_cloture">Clôturé</label>

				<input type="checkbox" name="checkbox_suspens" v-model="this.appartements.checkbox_suspens" @change="saveFormData(index)">
				<label for="checkbox_cloture">Suspens</label>

				<input type="checkbox" name="checkbox_devis" v-model="this.appartements.checkbox_devis" @change="saveFormData(index)">
				<label for="checkbox_cloture">HC-Devis à faire</label>
			</div>
			<div>
				<label>Observations :</label>
				<textarea v-model="this.appartements.remarque"></textarea>
			</div>
			<div>
				<label>Temps passé (hors déplacement)* :</label>
				<select v-model="this.appartements.temps_passe" @change="saveFormData(index)">
					<option>15min</option>
					<option>30min</option>
					<option>45min</option>
					<option>1h</option>
					<option>1h15min</option>
					<option>1h30min</option>
					<option>1h45min</option>
					<option>2h</option>
					<option>2h15min</option>
					<option>2h30min</option>
					<option>2h45min</option>
					<option>3h</option>
					<option>3h15min</option>
					<option>3h30min</option>
					<option>3h45min</option>
					<option>4h</option>
				</select>
			</div>
		</div>
	</div>
	<a href="/#/idbtest" style="background: #c2bdb9; color: white; padding: 10px; border-radius: 10px;">SAUVEGARDER</a>
	</form>
</template>

<script>
import { set, get } from 'idb-keyval';

export default {
	name: 'VHInter',
	data() {
		return {
			vg_occ: '',
			vg_id: '',
			appartements: {
				nom: '',
				bat: '',
				escalier: '',
				etage: '',
				porte: '',
				objet: '',
				remarque_ra: '',
				temps_passe: '',
				checkbox_cloture: false,
				checkbox_suspens: false,
				checkbox_devis: false,
				inter: [
					{
						inter_option: [],
						inter_type: '',
						inter_lieu: '',
						inter_presta: '',
						inter_qty: '',
					},
				],
				verif_ra: false,
				verif_rob: false,
				verif_wc: false
			},
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
		let item_id = getVars.vgocc;
		this.vg_occ = item_id;
		this.vg_id = this.$route.params.id;

		// var result = JSON.stringify(this.appartements);
		// var test = JSON.parse(result);
		// set('VH-xxx-1', test);
		
		this.getFormData();
		window.addEventListener('beforeunload', this.saveFormData);
	},
  beforeUnmount() {
    window.removeEventListener('beforeunload', this.saveFormData);
  },
  methods: {
    async saveFormData() {
		//Data from table + form
		var result = this.$data;
		//To avoid cloning error
		result = JSON.stringify(result);
		var test = JSON.parse(result);
		console.log(test.appartements);
		await set('VH-xxx-'+this.vg_occ, test.appartements);
    },
    async getFormData() {
		let savedData = await get('VH-xxx-'+this.vg_occ);
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
						inter_option: [],
						inter_type: '',
						inter_lieu: '',
						inter_presta: '',
						inter_qty: '',
					}
				);
			} else {
				alert("Vous devez remplir l'intervention précédente avant d'en rajouter une nouvelle")
			}
		} else {
			this.appartements.inter.push(
				{
					inter_option: [],
					inter_type: '',
					inter_lieu: '',
					inter_presta: '',
					inter_qty: '',
				}
			);
		}
		this.saveFormData();
    },
    removeItem() {
		this.appartements.inter.pop();
		this.saveFormData();
    },
    changeFamily(event, index) {
		if(event.target.value == 'wc') {
			this.appartements.inter[index].inter_option = [
				"MEC - Mécanisme de chasse",
				"RF - Robinet flotteur",
				"RAWC - Robinet d'arrêt de chasse d'eau",
				"RES - Réservoir de chasse"
			];
		} else if(event.target.value == 'ra') {
			this.appartements.inter[index].inter_option = [
				"RAEF - Robinet d'arrêt EF",
				"JFRAEF - Joint fibre après RA EF",
				"CAR - Clapet antiretour",
				"MAN - Manchette d'attente"
			];
		} else if(event.target.value == 'robinetterie') {
			this.appartements.inter[index].inter_option = [
				"MEL - Melangeur",
				"MAL - Robinet machine à laver",
				"FLEXD - Flexible et Douchette",
				"CDC - Col de cygne"
			];
		} else if(event.target.value == 'robinetterie commune') {
			this.appartements.inter[index].inter_option = [
				"VPCEFP2 - Vanne PDC EF controle manipulation",
				"VPCEFP3 - Vanne PDC EF garantie totale",
				"ROBCOM - Robinets de puisage commun"
			];
		}
    },
    submitForm() {
      this.getFormData();
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
		margin-bottom: 0px;
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