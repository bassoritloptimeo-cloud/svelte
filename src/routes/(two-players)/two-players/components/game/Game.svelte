<script lang="ts">
	import { asset } from '$app/paths';
	import { computingSpeed$, gameStarted$, level$, moveCursor, player1Name$, player2Name$, restartGame, settings$ } from "../../code";
	import Board from './Board.svelte';
</script>

<div class="play-container">
	<h2 class="niveau-ordi">Niveau de l'ordinateur: {$level$}</h2>
	<div class="bouton-principal">
		<button onclick={() => restartGame()} class="reinitialiser">Nouvelle partie</button>
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
	<div class="evaluation">
		<h4 class="evalInstantanee eval">Evaluation instantanée: <span class="evalInstantanee-value"></span></h4>
		<h4 class="evalAdversaire eval">Evaluation de l'advsersaire: <span class="evalAdversaire-value"></span></h4>
		<h4 class="evalAide eval">Evaluation MinMax: <span class="evalAide-value"></span></h4>
	</div>
	<div class="board-container">
		<Board />
	</div>
	<div class="infoNeg">
		<h5>Temps de Calcul: <span class="tCalc"></span></h5>
		<h5><span class="vCalc">(TODO : Temps calcul)</span></h5>
	</div>
		<div class="infoNegamax">
		<div class="info">
			Temps: {$computingSpeed$.time}
		</div>
		<div class="info">
			Vitesse: {$computingSpeed$.speed}
		</div>
	</div>
	<div class="retour">
		<button onclick={(() => $gameStarted$ = false)} class="menu-bouton">
			<div>Retour au menu</div>
			<img class="icone" src={asset("/two-players/retour.svg")} width="20px" alt="Retour au menu">
		</button>
	</div>
	<div class="info"></div>
	<div class="fleches">
		<button onclick={() => moveCursor(-1)} class="move">&#8592;</button>
		<button onclick={() => moveCursor(1)} class="move">&#8594;</button>
	</div>
	<button class="menu_content" 
		onclick={() => {
			settings$.set(true);		
		}}>
		<img class="icone" src={asset("/two-players/menu.svg")} width="50px" alt="Menu">
	</button>
</div>

<style>

	h3 {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 5px;
	}

	.legende {
		margin-top: 15px;
	}

	.player {
		height: 15px;
		width: 15px;
		border-radius: 50%;
		box-shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.9);
	}

	.player1 {
		background-color: rgb(0, 180, 0);
	}

	.player2 {
		background-color: rgb(180, 0, 0);
	}

	.infoNegamax {
		flex-direction: column;
		text-align: center;
	}

	.info {
		color: rgb(0, 0, 0);
		font-weight: 700;
		margin: 10px;
	}
	.niveau-ordi {
		font-weight: 700;
	}
</style>

