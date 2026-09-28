<script lang="ts">
	import { position, sherif$, bandit$, beginGame$, handleGlobalKeyDown, sheriffMoves$, sherifInventory$, banditInventory$, text$, banditMoves$ } from "./state.store";
	import { base } from "$app/paths";
	import { placePositions, placeByPos } from "./data";
    import "../../global.css";
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


<div class="jeu-sherif container">
	<div class="play_container">
		<div class="map_container">
			<img src={`${base}/sherif/map.jpg`} alt="Carte du monde" class="map">
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

	</div>
	<div class="wallpaper">
		<div class="buttons">
			<button onclick={position}>Commencer le jeu</button>
		</div>
		{#if $beginGame$}
			<div class="bottom-element">
				<div>
					<h2>>> Mouvement</h2>
				</div>
				<div class="relatives-moves">
					<div class="sherifM">
						<div class="sherifName">
							<div class="circle-sherif"></div>
							<h2 class="sherif-title">Sherif</h2>
						</div>
						{#each $sheriffMoves$ as {path, place} (path)}
							<div>
								<p class="moves_possibilities">{path + ". " + place.nom}</p>
							</div>
						{/each}
					</div>
					<div class="banditM">
						<div class="banditName">
							<div class="circle-bandit"></div>
							<h2 class="bandit-title">Bandit</h2>
						</div>
						{#each $banditMoves$ as {path, place} (path)}
							<div>
								<p class="moves_possibilities">{path + ". " + place.nom}</p>
							</div>
						{/each}
					</div>
				</div>

			</div>
			<Inventory 
				sherifInventory={$sherifInventory$}
				banditInventory={$banditInventory$}
				inventoryTranslations={$inventoryTranslations$}
			></Inventory>
		<div>
			<Text
				text={$text$}
			></Text>
		</div>
		{/if}
	</div>
</div>

<style>

	.map_container {
		position: relative;
		display: inline-block;
	}

	.relatives-moves {
		display: grid;
    	grid-template-columns: auto auto;
	}
</style>