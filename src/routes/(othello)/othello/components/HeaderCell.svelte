<script lang="ts">
	interface Props {
		index: number;
		letter?: boolean;
	}

	const letters = ["A", "	B", "C", "D", "E", "F", "G", "H"];

	const {index, letter = false}: Props = $props();
</script>

{#if index}
	{#if letter}
		<div class="cell">{letters[index - 1]}</div>
	{:else}
		<div class="cell">{index}</div>
	{/if}
{:else}
	<div class="cell"></div>
{/if}

<style>
	.cell {
		background-color: var(--color-cell-header);
		color: white;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 150%;
		margin: -2px;
	}
</style>
