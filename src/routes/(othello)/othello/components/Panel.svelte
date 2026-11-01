<script>
	import {state$} from "../code";

	const {trait} = $derived($state$);
	const nameTrait = $derived(trait === 1 ? "BLANCS": "NOIRS");
</script>

<div class="panel">
	<div class="trait-container">
		<div class={`trait ${trait === 1 ? "white" : "black"}`}></div>
		<p>C'est au tour des
			<br>
			<span>{nameTrait}</span>
		</p>
	</div>
</div>

<style>
	.panel {
		position: absolute;
		width: 20%;
		display: flex;
		height: calc(var(--board-size) + 7 * var(--line-gap));
		background-color: rgb(37, 33, 30);
		border: 1px solid white;
		border-radius: 50px;
		justify-content: center;
		box-shadow: 0 4px 6px rgb(0 0 0 / 10%);
	}

	.trait-container {
		display: flex;
    	flex-direction: row;
		border-radius: 10px;
		border: 4px solid rgb(245 158 11 / 0.8);
		width: 75%;
		margin: 10px;

	}

	.trait {
		margin: 7%;
		width: 30px;
		height: 30px;
		border-radius: 50%;
	}

	.white {
		background-color: rgb(255 255 255 / 100%);
	}

	.black {
		background-color: rgb(0 0 0 / 100%);
	}

	p {
		color: white;
	}

	span {
		color: white;
	}
</style>
