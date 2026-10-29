<script lang="ts">
	import Board from "./components/Board.svelte";
	import "./othello.css";
	import Panel from "./Panel.svelte";
</script>


<div class="board-parent">
	<div class="left">
		<Panel />
	</div>
	<div>
		<Board />
	</div>
	<div class="right"></div>
</div>

<style>
	.board-parent {
		display: grid;
		grid-template-columns: 1fr auto 1fr;
		flex-direction: column;
    	justify-content: space-evenly;
		align-items: center;
		width: 100vw;
    	height: 100vh;
	}

	.left {
		display: flex;
		justify-content: right;
		padding-right: 1rem;
	}

</style>
