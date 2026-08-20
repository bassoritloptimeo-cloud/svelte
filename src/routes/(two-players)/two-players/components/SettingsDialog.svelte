<script lang="ts">
	import { validModif } from "../code";
</script>


<dialog id="dialog_Menu">
	<div class = "slider_conteneur">
		<div class="options">
			<div class="label_content">
				<label for="abset-move-annotation">
					<input class="eval-checkbox" type="checkbox" name="case1">Activer l'évaluation
				</label>
			</div>
			<div class="label_content">
				<label>
					<input class="mCoup" type="checkbox" name="case1">Montrer le meilleur coup
				</label>
			</div>
			<div class="label_content">
				<label>
					<input class="dCoup" type="checkbox" name="case1">Afficher le dernier coup
				</label>
			</div>
			<div class="label_content">
				<label>
					<input class="evalEnnemi" type="checkbox" name="case1">Montrer l'évaluation calculée
				</label>
			</div>
			<div class="label_content">
				<label for="abset-move-annotation">
					<input class="negInfo-checkbox" type="checkbox" name="case1">Afficher les informations negamax
				</label>
			</div>
			<label for="pet-select">Nombre de coeurs actifs :</label>
			<select id="pet-select" name="pets" class="thread-Select">
				<option value="2" class="C2">2</option>
				<option value="4" class="C4">4</option>
				<option value="6" class="C6">6</option>
				<option value="8" class="C8">8</option>
				<option value="10" class="C10">10</option>
				<option value="12" class="C12">12</option>
				<option value="14" class="C14">14</option>
				<option value="16" class="C16">16</option>
			</select>
		</div>
		<div class="actifs"></div>
		<button onclick={() => validModif(true)}>Valider</button>
	</div>
</dialog>