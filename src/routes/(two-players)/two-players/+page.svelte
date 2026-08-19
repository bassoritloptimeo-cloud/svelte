<script lang="ts">
	import { afficherNiveauDialog, commencerOrdi, gameStarted$, validerDialog, validModif } from "./code";

	import Game from './components/Game.svelte';
	import Menu from './components/Menu.svelte';

	// import '../../global.css';
	import './styles.css';
</script>
<div class="plateau">
	{#if !$gameStarted$}
		<Menu />
	{:else}
		<Game />
	{/if}
</div>
<dialog id="dialog1" onkeydown={() => validerDialog(true)}>
	<div class = "slider_conteneur">
		<label for="gameLevel" class="niveau">Niveau de jeu</label>
		<input
			id="gameLevel"
			type="range"
			name="note"
			min="1"
			max="10"
			step="1"
			value="5"
			class="niveauOrdi"
			oninput={() => afficherNiveauDialog()}
		/>
		<p class="slider_value">Valeur actuelle : <span class="valeur-niveau">5</span></p>
	</div>
	<div class="valider">
		<button onclick={() => commencerOrdi()}>Valider</button>
	</div>
</dialog>
<dialog id="dialog_Menu" onkeydown={() => validerDialog(false)}>
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