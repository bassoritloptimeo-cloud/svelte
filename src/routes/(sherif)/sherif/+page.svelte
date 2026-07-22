<script lang="ts">
	import { position, sheriff$, bandit$, handleGlobalKeyDown } from "./state.store";
	import { placePositions } from "./data";
    import "./styles.css";
	
	
</script>

<svelte:window onkeydown={handleGlobalKeyDown} />

<svelte:head>
  <title>Shérif et bandit</title>s
</svelte:head>


<div class="container">
	<div class="play_contener">
		<img src="sherif/map.jpg" alt="Carte du monde" class="map">
		<img src="sherif/sherif.png" alt="Shérif" class="character sherif" style={`left: ${placePositions[$sheriff$.place]?.left ?? 0}%; top: ${placePositions[$sheriff$.place]?.top ?? 0}%;`}>
		<img src="sherif/bandit.png" alt="Bandit" class="character bandit" style={`left: ${placePositions[$bandit$.place]?.left ?? 0}%; top: ${placePositions[$bandit$.place]?.top ?? 0}%;`}>
	</div>
	<div class="option">
		<button onclick={position}>Commencer le jeu</button>
	</div>
</div>

<style>
	.character {
		position: absolute;
		height: 10%;
		filter: drop-shadow(-10px 0px 8px red);
		transition: 500ms;
	}
</style>