<script lang="ts">
	import {onCellClick, playableCellsStr$} from "../code";

	interface Props {
		value: number;
		x: number;
		y: number;
	}

	const {value, x, y}: Props = $props();
	let isPlayable = $derived($playableCellsStr$.includes(`${y}${x}`));

	function onclick() {
		if (isPlayable) {
			onCellClick(y, x);
		}

		console.log(`🔴 (DEBUG) [Cell.svelte:10]: onclick: `, x, y);
	}
</script>

<button class:playable={isPlayable} {onclick}>
	{#if value}

		<div class="pawn" class:white={value === 1} class:black={value === -1}></div>

	{/if}
</button>

<style>
	button {
		all: unset;
		position: relative;
		border: var(--border-cell) solid white;
		background-color: var(--color-cell);
		pointer-events: none;
		
		&.playable {
			pointer-events: all;
			cursor: pointer;
		}
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
