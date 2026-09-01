<script lang="ts">
	import { asset } from '$app/paths';
	import { gameStarted$, moveCursor, openMenu, player1Name$, player2Name$, restartGame } from "../../code";
	import Board from './Board.svelte';
</script>

<div class="play-container">
	<h2 class="niveau-ordi">(niveau ordi)</h2>
	<div class="bouton-principal">
		<button onclick={() => restartGame()} class="reinitialiser">Nouvelle partie</button>
	</div>
	<div class="legende">
		<h3>{$player1Name$}</h3>
		<h3>{$player2Name$}</h3>
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
	<div class="infoNegamax"></div>
	<button class="menu_content" onclick={() => openMenu()}>
		<img class="icone" src={asset("/two-players/menu.svg")} width="50px" alt="Menu">
	</button>
</div>

