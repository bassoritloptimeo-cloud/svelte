<script lang="ts">
	import { board$ } from "../../code";
</script>

<div class="Board">
	{#each $board$ as line, j (j)}
		{#each line as cell, i (`${i}_${j}`)}
			<div class="cell">
				{cell ? cell : ''}
			</div>
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
  	}

	.cell {
		/* Centrage du contenu */
		display: flex;
		justify-content: center; /* Centrage horizontal */
		align-items: center;     /* Centrage vertical */
		background-color: white;

	}	
</style>

