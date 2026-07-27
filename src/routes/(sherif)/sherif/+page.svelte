<script lang="ts">
	import { position, sheriff$, bandit$,beginGame$, banditMovesActu$, handleGlobalKeyDown, sheriffMoves$ } from "./state.store";
	import { placePositions, placeByPos } from "./data";
    import "./styles.css";
	
	
</script>

<svelte:window onkeydown={handleGlobalKeyDown} />

<svelte:head>
  <title>Shérif et bandit</title>s
</svelte:head>


<div class="container">
	<div class="play_contener">
		<img src="sherif/map.jpg" alt="Carte du monde" class="map">
		<img src="sherif/sherif.png" alt="Shérif" class="character sherif" style={`left: ${placePositions[placeByPos[`${$sheriff$.x},${$sheriff$.y}`]]?.left ?? 0}%; top: ${placePositions[placeByPos[`${$sheriff$.x},${$sheriff$.y}`]]?.top ?? 0}%;`}>
		<img src="sherif/bandit.png" alt="Bandit" class="character bandit" style={`left: ${placePositions[placeByPos[`${$bandit$.x},${$bandit$.y}`]]?.left ?? 0}%; top: ${placePositions[placeByPos[`${$bandit$.x},${$bandit$.y}`]]?.top ?? 0}%;`}>
	</div>
	<div class="option">
		<button onclick={position}>Commencer le jeu</button>
		{#if $beginGame$}
			<div class="moves">
				<p class="moves_opposant">Déplacements adverse</p>
				<div class="relatives-moves">
					{#each Object.entries($banditMovesActu$) as [key, value] (key)}
						<div>
							<p class="moves_possibilities">{key}</p>
						</div>
						<div>
							<p class="moves_possibilities">{value}</p>
						</div>
					{/each}
				</div>
			</div>

			<div class="relatives-moves">
				{#each Object.entries($sheriffMoves$) as [key, place] (key)}
					<div>
						<p class="moves_possibilities">{key}</p>
					</div>
					<div>
						<p class="moves_possibilities">{place.nom}</p>
					</div>
				{/each}
			</div>

		{/if}
	</div>
</div>

<style>
	.character {
		position: absolute;
		height: 10%;
		filter: drop-shadow(-10px 0px 8px red);
		transition: 500ms;
	}
	.moves_opposant {
		margin-top: 5px;
		margin-bottom: 20px;
		margin-left: 20px;
		font-size: 2rem;
		color: rgb(100, 20, 20);
	}
	.moves {
		width: 500px;
		border-top: 5px solid rgb(100, 20, 20);
	}
	.relatives-moves {
		display: grid;
		grid-template-columns: auto 1fr;
	}
	.moves_possibilities {
		display: inline-block;
		border: 2px solid rgb(100, 20, 20);
		font-size: 1.75rem;
		padding: 5px 10px 5px 10px;
	}
</style>