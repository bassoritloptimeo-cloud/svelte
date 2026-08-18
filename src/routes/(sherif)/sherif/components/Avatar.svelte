<script lang="ts">
	import { base } from '$app/paths';

	interface Props {
		name: "sherif" | "bandit"
		left: number
		top: number
	}

	const { left = 0, top = 0, name }: Props = $props();

	const labels = {
		sherif: "Shérif",
		bandit: "Bandit",
	}

</script>

<div class="Avatar sherif" class:sherif={name === 'sherif'} class:bandit={name === 'bandit'} style:top={`${top}%`} style:left={`${left}%`}>
	<div class="avatar-background"></div>
	<img src={`${base}/sherif/${name}.png`} alt={labels[name]}>
</div>

<style>
	.Avatar {
		position: absolute;
		transition: 500ms;
		height: 10%;

		img {
			height: 100%;
		}
	}

	.sherif {
		filter: drop-shadow(-10px 0px 8px green);
	}

	.bandit {
		filter: drop-shadow(-10px 0px 8px red);
	}

	.avatar-background {
		position: absolute;
		inset: 0;
		background-color: white;
		aspect-ratio: 1 / 1;
		border-radius: 50%;
		z-index: -1;
	}
</style>