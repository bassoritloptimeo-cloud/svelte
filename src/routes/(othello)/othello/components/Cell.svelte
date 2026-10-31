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

	{:else}
		<div class:possibleMove={isPlayable}></div>
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

	.possibleMove {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 1rem;
		aspect-ratio: 1 / 1;
		border-radius: 50%;
		background-color: rgba(255, 255, 255, 0.5);
		border: 1.5px dashed rgba(255, 255, 255, 0.65);
		transition: width 100ms linear;
		opacity: 0.6;
	}

	button:hover .possibleMove {
		width: 1.25rem;
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
		background: radial-gradient( circle at 35% 30%, var(--white-radiant) 100% );
		box-shadow: 2px 5px 10px var(--white-shadow-color);
  		border: 1px solid var(--white-border-color);
	}

	.black {
		background: radial-gradient(circle at 35% 30%, var(--black-radiant-color) 100%);
		box-shadow: 2px 5px 9px var(--black-shadow-color);
		border: 1px solid var(--black-border-color);
	}


</style>
