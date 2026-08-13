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
	<div class="wallpaper">
		<div class="option">
			<button onclick={position}>Commencer le jeu</button>
			{#if $beginGame$}
				<div class="bottom-element">
					<div>
						<h2>>> Mouvement</h2>
					</div>
					<div class="relatives-moves">
						<div class="sherifM">
							<div class="sherifName">
								<div class="circle-sherif"></div>
								<h2 class="sherif-Title">Sherif</h2>
							</div>
							{#each $sheriffMoves$ as {path, placeS} (path)}
								<div>
									<p class="moves_possibilities">{path + ". " + placeS.nom}</p>
								</div>
							{/each}
						</div>
						<div class="banditM">
							<div class="banditName">
								<div class="circle-bandit"></div>
								<h2 class="bandit-Title">Bandit</h2>
							</div>
							{#each $sheriffMoves$ as {path, placeB} (path)}
								<div>
									<p class="moves_possibilities">{path + ". " + placeB.nom}</p>
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
</div>

<style>
	.relatives-moves {
		display: grid;
    	grid-template-columns: auto auto;
	}
</style>