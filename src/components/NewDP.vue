<script>
import axios from "axios";
import { get } from 'idb-keyval';


export default {
    name: 'NewDP',
    data() {
		return {
			tech_id: '',
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
			occupant: {
				DPOC_bat: '',
				DPOC_codeAcces: '',
				DPOC_escalier: '',
				DPOC_etage: '',
				DPOC_occupant: '',
				DPOC_porte: ''
			},
			currIp: this.currIp
		};
	},
    async mounted () {
		let tech_id = await get('current_tech');
		this.tech_id = tech_id;
		axios.get(this.currIp+'/get_all_presta').then((response) => {
			this.inter_option = response.data;
			console.log(this.inter_option);
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
			console.log(this.occupant);
		},
		onEnd() {
			this.save();
		},
		getFormValues() {
			const content = {
								DP_remarqueContractuelle: this.DP_remarqueContractuelle,
								DP_remarqueInter: this.DP_remarqueInter,
								DP_observations: this.DP_observations,
								temps_passe: this.temps_passe,
								statut: this.statut,
								acces_porte: this.acces_porte,
								tech_id: this.tech_id,
								raf_devis: this.raf_devis,
								inter: this.inter,
								occupant: this.occupant,
								signature: this.signature,
								image: this.image
							};
			console.log(content);
			if(confirm("TERMINER L'INTERVENTION. Vous allez envoyer les données au siège, vous ne pourrez plus accéder à cette DP.")){
				axios.post(this.currIp+"/submit_new_dp", content).then((response) => {
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
							inter_qty: '',
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
						inter_qty: '',
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
			};
			reader.readAsDataURL(file);
		}
	}
};

</script>

<template>
	<form @submit.prevent="getFormValues">
		<div class="form_header">
			<div class="header_headline">
				<a href="/"><img class="return_button" src="../assets/fleche2_blanc.svg"></a>
				<img src="../assets/logo-gereco-2.svg">
			</div>
			<div style="font-size: 19px; color:white; font-weight: bold;">NOUVEAU DÉPANNAGE</div>
			
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
								<td><input type="text" v-model="occupant.DPOC_occupant"></td>
								<td><input type="text" v-model="occupant.DPOC_bat"></td>
								<td><input type="text" v-model="occupant.DPOC_escalier"></td>
							</tr>
						</table>
						<table>
							<tr>
								<th>Et</th>
								<th>Pte</th>
								<th>Code</th>
							</tr>
							<tr>
								<td><input type="text" v-model="occupant.DPOC_etage"></td>
								<td><input type="text" v-model="occupant.DPOC_porte"></td>
								<td><input type="text" v-model="occupant.DPOC_codeAcces"></td>
							</tr>
						</table>
					</div>
				</div>
			</div>

			<div class="form_bloc">
				<div class="form_bloc_title">Remarques (informations à modifier)</div>
				<div class="form_bloc_content">
					<textarea v-model="DP_remarqueContractuelle"></textarea>
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
									<select style="width: 50px;" v-model="item['inter_lieu']">
										<option>SDB</option>
										<option>WC</option>
										<option>Cuis.</option>
										<option>Ch.</option>
										<option>SD</option>
									</select>
								</td>
								<td>
									<select style="width: 75px;" v-model="item['inter_type']">
										<option value="1">RA - Robinet arrêt</option>
										<option value="4">WC</option>
										<option value="3">ROB - Robinetterie</option>
										<option value="5">GENER - Générique</option>
									</select>
								</td>
								<td>
									<select v-model="item['inter_presta']" :disabled="item['inter_type'] != '' && item['inter_lieu'] != '' ? disabled : ''">
										<option v-for="key in inter_option['presta_fam' + item['inter_type']]" :key="key" :value="key.id">
											{{ key.libelle }}
										</option>
										<option value="991">Prestation hors-contrat</option>
									</select>
								</td>
								<td>
									<input style="width: 15px;" type="number" v-model="item['inter_qty']" :disabled="item['inter_lieu'] != '' && item['inter_type'] != '' ? disabled : ''">
								</td>
							</tr>
						</table>

						<p>
							<label style="">Remarque si autre Lieu ou autre robinetterie: </label><br>
							<textarea v-model="DP_remarqueInter"></textarea>
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
					<select v-model="this.acces_porte">
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
					<textarea v-model="DP_observations"></textarea>
				</div>
				<div id="intervention">
					<label>Statut intervention :</label>
					<select v-model="this.statut">
						<option>Clôturé</option>
						<option>En suspens</option>
					</select>
				</div>
				<div style="margin-bottom: 20px;">
					<input type="checkbox" name="checkbox_devis" v-model="this.raf_devis">
					<label for="checkbox_devis">Devis à faire</label><br>
				</div>

				<div style="margin-bottom: 20px;">
					<label>Temps passé (hors déplacement)* :</label>
					<select v-model="this.temps_passe">
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
					<VueSignaturePad @change="save" height="200px" class="signaturePad" ref="signaturePad" :options="{ onBegin, onEnd }" />
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
