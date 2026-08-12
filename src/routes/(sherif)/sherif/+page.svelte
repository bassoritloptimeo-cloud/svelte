<script lang="ts">
	import { position, sherif$, bandit$, beginGame$, handleGlobalKeyDown, sheriffMoves$, sherifInventory$, banditInventory$, text$ } from "./state.store";
	import { placePositions, placeByPos } from "./data";
    import "./styles.css";
	import Avatar from "./components/Avatar.svelte";
	import Inventory from "./components/Inventory.svelte";
	import Text from "./components/text.svelte";
	import { inventoryTranslations$ } from "./traductions";
	
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
			<div class="relatives-moves">
				{#each $sheriffMoves$ as {path, placeS, placeB} (path)}
					<div>
						<p class="moves_possibilities">{path}</p>
					</div>
					<div>
						<p class="moves_possibilities">{placeS.nom}</p>
					</div>
					<div>
						<p class="moves_possibilities">{placeB.nom}</p>
					</div>
				{/each}
			</div>
			<Inventory 
				sherifInventory={$sherifInventory$}
				banditInventory={$banditInventory$}
				inventoryTranslations={$inventoryTranslations$}
			></Inventory>
		{/if}
	</div>
	<div>
		{#if $beginGame$}
			<Text
				text={$text$}
			></Text>
		{/if}
	</div>
</div>

<style>
	.relatives-moves {
		display: grid;
    	grid-template-columns: auto auto auto;
	}
	.moves_possibilities {
		display: inline-block;
		border: 2px solid rgb(100, 20, 20);
		padding: 5px 10px 5px 10px;
	}
</style>