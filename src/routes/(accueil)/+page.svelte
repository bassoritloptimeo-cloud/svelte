<script>
	import { resolve } from "$app/paths";
</script>

<nav class="container" data-sveltekit-reload>
    <a href={resolve('/sur-le-toit/')}>Labyrinthe 3D (sur le toit)</a>
	<a href={resolve('/two-players/')}>Two players</a>
	<a href={resolve('/sherif/')}>Shérif et bandit</a>
	<a href={resolve('/test/')}>Test</a>
</nav>

<style>
    .container {
        padding: 2rem;
    }
	a {
		display: block;
	}
</style>
