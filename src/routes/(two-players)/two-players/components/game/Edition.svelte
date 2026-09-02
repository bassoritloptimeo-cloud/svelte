<script lang="ts">
	import { asset } from '$app/paths';
	import { ajout, traitEdition, validEdition, gameStarted$, backgroundColor$ } from "../../code";
	import Board from './Board.svelte';
</script>

<div class={`play-container ${$backgroundColor$}`}>
	<h2 class="niveau-ordi">(niveau ordi)</h2>
	<div class="bouton-principal">
		<button onclick={() => validEdition()} class="valEdit">Valider l'édition</button>
	</div>
	<div class="legende"></div>
	<div class="evaluation">
		<h4 class="evalInstantanee eval">Evaluation instantanée: <span class="evalInstantanee-value"></span></h4>
		<h4 class="evalAdversaire eval">Evaluation de l'advsersaire: <span class="evalAdversaire-value"></span></h4>
		<h4 class="evalAide eval">Evaluation MinMax: <span class="evalAide-value"></span></h4>
	</div>
	<div class="board-container">
		<Board />
	</div>
	<div class="couleurEdition desactiveEditeur">
		<button class="vertSelect" onclick={() => ajout(1)}>Ajout de points verts</button>
		<button class="reversTrait" onclick={() => traitEdition()}>Changer le trait</button>
		<button class="rougeSelect"onclick={() => ajout(-1)}>Ajout de points rouges</button>
	</div>
	<div class="infoNeg">
		<h5>Temps de Calcul: <span class="tCalc"></span></h5>
		<h5><span class="vCalc">(TODO : Temps calcul)</span></h5>
	</div>
	<div class="retour">
		<button onclick={(() => $gameStarted$ = false)} class="menu-bouton">
			<div>Retour au menu</div>
			<img class="icone" src={asset("/two-players/retour.svg")} width="20px" alt="Retour au menu">
		</button>
	</div>
	<div class="info"></div>
</div>

<style>

	.player1 {
		background-color: rgb(0, 220, 0);
	}

	.player2 {
		background-color: rgb(255, 0, 0);
	}

</style>