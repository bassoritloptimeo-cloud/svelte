<script lang="ts">
	import {board$} from "../code";
	import Cell from "./Cell.svelte";
	import HeaderCell from "./HeaderCell.svelte";
</script>

<div class="board-parent">
	<div class="board">
		{#each {length: 9} as _, i (i)}
			<HeaderCell index={i} letter isLast={false} />
		{/each}
		<HeaderCell index={0} letter isLast={false} />
		{#each $board$ as line, y (y)}
			<HeaderCell index={y + 1} isLast={false} />
			{#each line as value, x (x)}
				<Cell {x} {y} {value} />
			{/each}
			<HeaderCell index={y + 1} isLast={true} />
		{/each}
		{#each {length: 9} as _, i (i)}
			<HeaderCell index={i} letter isLast={true} />
		{/each}
		<HeaderCell index={0} letter isLast={true} />
	</div>
</div>

<style>
	.board {
		display: grid;
		grid-template-columns: var(--header-size) repeat(8, 1fr) var(--header-size);
		grid-template-rows: var(--header-size) repeat(8, 1fr) var(--header-size);
		width: calc(var(--board-size) + 14 * var(--border-cell));
		aspect-ratio: 1 / 1;
		gap: 0;
	}

	.board-parent {
		background-color: var(--color-cell-header);
	}

</style>
