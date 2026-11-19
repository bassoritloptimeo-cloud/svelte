<script>
	import {state$} from "../code";
	import Pawn from "./Pawn.svelte";

	const {trait} = $derived($state$);
	const nameTrait = $derived(trait === 1 ? "BLANCS" : "NOIRS");
</script>

<div class="panel">
	<div class="trait-container">
		<p class="trait-id">TRAIT EN COURS</p>
		<div class="trait-enfant">
			<div class="pawn-element">
				<div class="pawn-trait-container">
					<Pawn color={trait === 1 ? "white" : "black"} />
				</div>
			</div>
			<p class="trait-text">
				C'est au tour des
				<br />
				<span class="trait-name">{nameTrait}</span>
			</p>
		</div>
	</div>
</div>

<style>
	.panel {
		position: absolute;
		width: 20%;
		display: flex;
		height: calc(var(--board-size) + 7 * var(--line-gap));
		background: var(--color-gradiant-background);
		border: 1px solid white;
		border-radius: 50px;
		justify-content: center;
		box-shadow: 0 4px 6px rgb(0 0 0 / 10%);
	}

	.trait-text {
		color: var(--color-text-inert);
	}

	.pawn-trait-container {
		position: absolute;
		width: 30px;
		height: 30px;
	}

	.pawn-element {
		width: 30px;
		height: 30px;
	}

	.trait-name {
		font-weight: bold;
	}

	.trait-id {
		color: var(--color-text-inert);
		font-family: Inter, sans-serif;
		font-size: 0.8rem;
		font-weight: bold;
		margin: 0;
	}

	.trait-container {
		padding: 5px;
		display: flex;
		flex-direction: column;
		align-items: center;
		background-color: black;
		border-radius: 20px;
		width: 75%;
	}

	.trait-enfant {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 20px;
		border-radius: 10px;
		border: 4px solid rgb(245 158 11 / 80%);
		width: 85%;
		margin: 10px;
		padding-left: 10px;
	}

	p {
		color: white;
	}

	span {
		color: white;
	}
</style>
