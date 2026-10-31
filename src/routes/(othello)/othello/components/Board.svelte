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
		background: linear-gradient(
			135deg,
			var(--color-cell-header-top-left) 0%,
			var(--color-cell-header-middle) 40%,
			var(--color-cell-header-bottom-right) 100%
		);
		border-radius: 1rem;
		box-shadow: 0 20px 40px -10px var(--board-shadow-color);
		padding: var(--board-padding);
	}
</style>
