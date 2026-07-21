<script lang="ts">
    

</script>

<svelte:head>
  <title>Shérif et bandit</title>
</svelte:head>


<div class="container">
	<img src="sherif/map.jpg" alt="Carte du monde" class="map">
	<img src="sherif/sherif.png" alt="Shérif" class="character">
	<img src="sherif/bandit.png" alt="Bandit" class="character">
</div>

<style>
	.container {
		position: relative;
		height: 100vh;
	}

	.map {
		height: 100%;
	}

	.character {
		position: absolute;
		top: 0;
		left: 0;
		height: 10%;
	}
</style>