<script lang="ts">
	import { board$, trait$ } from "../../code";
	import Cell from "./Cell.svelte";

	const traitClass = $derived($trait$ === 1 ? "trait-player1" : "trait-player2")
</script>

<div class={`Board ${traitClass}`}>
	{#each $board$ as line, y (y)}
		{#each line as cell, x (`${x}_${y}`)}
			<Cell points={cell} {x} {y} />
		{/each}
	{/each}
</div>
<style>
	.Board {
		--size: 75px;
		display: grid;
		/* Crée 5 colonnes de 100px chacune */
		grid-template-columns: repeat(5, var(--size));
		grid-auto-rows: var(--size);

		background-color: #000;
		gap: 1px;
		border: 2px solid #000;


		& :global(.cell-0) {
			pointer-events: none;
		}
		&.trait-player1 :global(.player2) {
			pointer-events: none;
		}
	
		&.trait-player2 :global(.player1) {
			pointer-events: none;
		}
	}
</style>

