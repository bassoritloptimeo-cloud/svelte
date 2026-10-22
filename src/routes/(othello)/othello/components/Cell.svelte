<script lang="ts">
	interface Props {
		value: number;
		x: number;
		y: number;
	}

	const {value, x, y}: Props = $props();

	function onclick() {
		console.log(`🔴 (DEBUG) [Cell.svelte:10]: onclick: `, x, y);
	}
</script>

<button {onclick}>
	{#if value}
		<div class="pawn" class:white={value === 1} class:black={value === -1}></div>
	{/if}
</button>

<style>
	button {
		all: unset;
		position: relative;
		background-color: var(--color-cell);
	}

	.pawn {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: var(--pawn-size);
		aspect-ratio: 1 / 1;
		border-radius: 50%;
	}

	.white {
		background-color: var(--color-white);
	}

	.black {
		background-color: var(--color-black);
	}

</style>