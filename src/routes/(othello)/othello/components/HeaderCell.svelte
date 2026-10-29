<script lang="ts">
	interface Props {
		isLast: boolean
		index: number;
		letter?: boolean;
	}

	const letters = ["A", "	B", "C", "D", "E", "F", "G", "H"];

	const {index, letter = false, isLast}: Props = $props();
</script>

{#if index}
	{#if letter}
		<div class="cell letter" class:last-Letter={isLast} class:No-last-Letter={!isLast}>{letters[index - 1]}</div>
	{:else}
		<div class="cell number" class:last-Number={isLast} class:No-last-Number={!isLast}>{index}</div>
	{/if}
{:else}
	<div class="cell"></div>
{/if}

<style>
	.cell {
		background-color: rgba(0, 0, 0, 0);
		color: yellow;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 150%;
		margin: -2px;
	}

	.last-Number {
		border-left: var(--border-board) solid rgb(255, 255, 255, 1);
	}
	.last-Letter {
		border-top: var(--border-board) solid rgb(255, 255, 255, 1);
	}
	.No-last-Number {
		border-right: var(--border-board) solid rgb(255, 255, 255, 1);
	}
	.No-last-Letter {
		border-bottom: var(--border-board) solid rgb(255, 255, 255, 1);
	}
	
</style>
