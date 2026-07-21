<script>
	import { resolve } from "$app/paths";
</script>

<div class="container">
    <a href={resolve('/sur-le-toit')}>Labyrinthe 3D (sur le toit)</a>
	<a href={resolve('/test')}>Test</a>
</div>

<style>
    .container {
        padding: 2rem;
    }
	a {
		display: block;
	}
</style>
