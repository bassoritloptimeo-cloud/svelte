<script lang="ts">
	import { board$ } from "../code";
	import Cell from "./Cell.svelte";
</script>

<div class="board">
	{#each $board$ as line, y (y)}
		{#each line as value, x (x)}
			<Cell {x} {y} {value} />
		{/each}
	{/each}
</div>

<style>
	
	.board {
		display: grid;
		grid-template-columns: repeat(8, 1fr);
		grid-template-rows: repeat(8, 1fr);
		width: calc(var(--board-size) + 7 * var(--line-gap));
		aspect-ratio: 1 / 1;
		gap: var(--line-gap);
	}

</style>