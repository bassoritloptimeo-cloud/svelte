<script lang="ts">
	import { board$ } from "../code";
	import Cell from "./Cell.svelte";
	import HeaderCell from "./HeaderCell.svelte";
</script>

<div class="board">
	{#each { length: 9 } as _, i (i)}
		<HeaderCell index={i} letter />
	{/each}
	<HeaderCell index={0} letter />
	{#each $board$ as line, y (y)}
		<HeaderCell index={y + 1} />
		{#each line as value, x (x)}
			<Cell {x} {y} {value} />
		{/each}
		<HeaderCell index={y + 1} />
	{/each}
	{#each { length: 9 } as _, i (i)}
		<HeaderCell index={i} letter />
	{/each}
	<HeaderCell index={0} letter />
</div>

<style>
	
	.board {
		display: grid;
		grid-template-columns: var(--header-size) repeat(8, 1fr) var(--header-size);
		grid-template-rows: var(--header-size) repeat(8, 1fr) var(--header-size);
		width: calc(var(--board-size) + 7 * var(--line-gap));
		aspect-ratio: 1 / 1;
		gap: var(--line-gap);
	}

</style>