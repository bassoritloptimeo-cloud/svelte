<script lang="ts">
	import {asset} from "$app/paths";
	import {
		ajout,
		traitEdition,
		validEdition,
		gameStarted$,
		computerEnemy$,
		level$,
		player1Name$,
		player2Name$,
	} from "../../code";
	import Board from "./Board.svelte";
</script>

<div class="play-container">
	{#if $computerEnemy$}
		<h2 class="niveau-ordi">Niveau de l'ordinateur: {$level$}</h2>
	{/if}
	<div class="bouton-principal">
		<button onclick={() => validEdition()} class="valEdit">Valider l'édition</button>
	</div>
	<div class="legende">
		<h3>
			<div class="player player1"></div>
			{$player1Name$}
		</h3>
		<h3>
			<div class="player player2"></div>
			{$player2Name$}
		</h3>
	</div>
	<div class="board-container">
		<Board />
	</div>
	<div class="couleurEdition desactiveEditeur">
		<button class="vertSelect" onclick={() => ajout(1)}>Ajout de points verts</button>
		<button class="reversTrait" onclick={() => traitEdition()}>Changer le trait</button>
		<button class="rougeSelect" onclick={() => ajout(-1)}>Ajout de points rouges</button>
	</div>
	<div class="infoNeg">
		<h5>Temps de Calcul: <span class="tCalc"></span></h5>
		<h5><span class="vCalc">(TODO : Temps calcul)</span></h5>
	</div>
	<div class="retour">
		<button onclick={() => ($gameStarted$ = false)} class="menu-bouton">
			<div>Retour au menu</div>
			<img class="icone" src={asset("/two-players/retour.svg")} width="20px" alt="Retour au menu" />
		</button>
	</div>
	<div class="info"></div>
</div>

<style>
	h3 {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 5px;
	}

	.player {
		height: 15px;
		width: 15px;
		border-radius: 50%;
		box-shadow: 2px 2px 5px 0 rgb(0 0 0 / 90%);
	}

	.player1 {
		background-color: rgb(0 180 0);
	}

	.player2 {
		background-color: rgb(180 0 0);
	}
</style>
