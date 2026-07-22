<script lang="ts">
	import { position, sheriff$, bandit$, handleGlobalKeyDown } from "./state.store";
    import "./styles.css";
	
	
</script>

<svelte:window onkeydown={handleGlobalKeyDown} />

<svelte:head>
  <title>Shérif et bandit</title>s
</svelte:head>


<div class="container">
	<div class="play_contener">
		<img src="sherif/map.jpg" alt="Carte du monde" class="map">
		<img src="sherif/sherif.png" alt="Shérif" class="character sherif" style={`left: ${$sheriff$.x}%; top: ${$sheriff$.y}%;`}>
		<img src="sherif/bandit.png" alt="Bandit" class="character bandit" style={`left: ${$bandit$.x}%; top: ${$bandit$.y}%;`}>
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