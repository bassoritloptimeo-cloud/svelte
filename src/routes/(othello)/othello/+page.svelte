<script lang="ts">
	import Board from "./components/Board.svelte";
	import { trait$ } from "./code";
	import "./othello.css";
</script>


<div class="board-parent">
	<div class="panel">
		<div class={`trait ${$trait$ === 1 ? "white": "black"}`}></div>
	</div>
	<Board />
	<div></div>
</div>

<style>

	.panel {
		height: calc(var(--board-size) + 7 * var(--line-gap));
		background-color: rgb(200, 51, 51);
	}

	.board-parent {
		display: grid;
		grid-template-columns: 1fr auto 1fr;
		flex-direction: column;
    	justify-content: space-evenly;
		align-items: center;
		width: 100vw;
    	height: 100vh;
	}

	.trait {
		width: 1vw;
		aspect-ratio: 1 / 1;
		border-radius: 50%;
	}

	.white {
		background-color: rgb(255, 255, 255, 1);
	}

	.black {
		background-color: rgb(0, 0, 0, 1);
	}
</style>
