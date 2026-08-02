<script lang="ts">
	import { position, sherif$, bandit$,beginGame$, banditMovesActu$, handleGlobalKeyDown, sheriffMoves$ } from "./state.store";
	import { placePositions, placeByPos } from "./data";
    import "./styles.css";
	import Avatar from "./components/Avatar.svelte";
	
	
</script>

<svelte:window onkeydown={handleGlobalKeyDown} />

<svelte:head>
  <title>Shérif et bandit</title>
</svelte:head>


<div class="container">
	<div class="play_contener">
		<img src="sherif/map.jpg" alt="Carte du monde" class="map">
		<Avatar 
			name="sherif" 
			left={placePositions[placeByPos[`${$sherif$.x},${$sherif$.y}`]]?.left} 
			top={placePositions[placeByPos[`${$sherif$.x},${$sherif$.y}`]]?.top}
		></Avatar>
		<Avatar 
			name="bandit" 
			left={placePositions[placeByPos[`${$bandit$.x},${$bandit$.y}`]]?.left} 
			top={placePositions[placeByPos[`${$bandit$.x},${$bandit$.y}`]]?.top}
		></Avatar>

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