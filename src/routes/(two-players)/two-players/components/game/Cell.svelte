<script lang="ts">
	import { clickCell } from "../../code";

	interface Props {
		points: number;
		x: number;
		y: number;
	}

	const { points, x, y }: Props = $props(); 
	const absPoints = $derived(Math.abs(points));
	const colorClass = $derived(points < 0 ? "player2" : points > 0 ? "player1" : "");

</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<div role="button" tabindex="0" class={`cell cell-${absPoints} ${colorClass}`} onclick={() => clickCell({ x, y })}>
	{#each { length: absPoints } as _, i (i)}
		<div class={`bullet bullet-${i + 1}`}></div>
	{/each}
</div>

<style>
	.cell {
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: white;
		border: none;
		padding: 0;
		font: inherit;

		&.player1 {
			color: var(--player1-color);
		}

		&.player2 {
			color: var(--player2-color);
		}

	}

	.bullet {
		--size-bullet: 17px;
		width: var(--size-bullet);
		height: var(--size-bullet);
		border-radius: 50%;
		position: absolute;
		top: 50%;
		left: 50%;
		transition: all 0.15s linear;
	}
	.player1 .bullet {
		background-color: var(--player1-color);
	}
	.player2 .bullet {
		background-color: var(--player2-color);
	}
	.cell-1 .bullet-1 {
		transform: translate(-50%, -50%);
	}
	.cell-2 .bullet-1 {
		transform: translate(-125%, -50%);
	}
	.cell-2 .bullet-2 {
		transform: translate(25%, -50%);
	}
	.cell-3 .bullet-1 {
		transform: translate(-125%, -100%);
	}
	.cell-3 .bullet-2 {
		transform: translate(25%, -100%);
	}
	.cell-3 .bullet-3 {
		transform: translate(-50%, 0%);
	}
	.cell-4 .bullet-1 {
		transform: translate(-125%, -100%);
	}
	.cell-4 .bullet-2 {
		transform: translate(25%, -100%);
	}
	.cell-4 .bullet-3 {
		transform: translate(-125%, 50%);
	}
	.cell-4 .bullet-4 {
		transform: translate(25%, 50%);
	}
	.cell-5 .bullet-1 {
		transform: translate(-125%, -100%);
	}
	.cell-5 .bullet-2 {
		transform: translate(25%, -100%);
	}
	.cell-5 .bullet-3 {
		transform: translate(-125%, 50%);
	}
	.cell-5 .bullet-4 {
		transform: translate(25%, 50%);
	}
	.cell-5 .bullet-5 {
		transform: translate(-50%, -25%);
	}
	.cell-6 .bullet-1 {
		transform: translate(50, -50);
	}
	.cell-6 .bullet-2 {
		transform: translate(0, -50);
	}
	.cell-6 .bullet-3 {
		transform: translate(-50, -50);
	}
	.cell-6 .bullet-4 {
		transform: translate(50, 50);
	}
	.cell-6 .bullet-5 {
		transform: translate(0, 50);
	}
	.cell-6 .bullet-6 {
		transform: translate(-50, 50);
	}
</style>