<script>
	import { state$ } from "./code";

	const { trait } = $derived($state$);


</script>


<div class="panel">
	<div class="trait-container">
		<p>Trait : </p>
		<div class={`trait ${trait === 1 ? "white": "black"}`}></div>
	</div>
</div>


<style>

	.panel {
		width: 70%;
		display: flex;
		height: calc(var(--board-size) + 7 * var(--line-gap));
		background-color: rgb(211, 211, 211);
		border-radius: 50px;
		justify-content: center;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
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