<script>
	import {state$} from "../code";
	import Pawn from "./Pawn.svelte";

	const {trait, nbWhite, nbBlack} = $derived($state$);
	const nameTrait = $derived(trait === 1 ? "BLANCS" : "NOIRS");
	const somme = $derived(nbWhite + nbBlack);
</script>

<div class="panel">
	<div class="panel-presentation">
		<h1 class="info">JEU EN COURS</h1>

		<p class="freedoms">
			Tour
			<span class="variable-info">
				{somme - 4}
			</span>
			•
			<span class="variable-info">
				{64 - somme}
			</span>
			cases libres
		</p>
	</div>
	<div class="trait-container">
		<p class="trait-id">TRAIT EN COURS</p>
		<div class="trait-child">
			<div class="pawn-element">
				<div class="pawn-trait-container">
					<Pawn color={trait === 1 ? "white" : "black"} />
				</div>
			</div>
			<p class="trait-text">
				C'est au tour des
				<br />
				<span class="variable-info">{nameTrait}</span>
			</p>
		</div>
	</div>

	<div class="players-info">
		<div
			class={"black-player " +
				(trait === 1 ? "is-not-the-player-in-trait" : "is-the-player-in-trait")}
		>
			<div class="pawn-element-value">
				<div class="pawn-value-container">
					<Pawn color="black" />
				</div>
			</div>
			<div>
				<p class="number-point">
					<span
						class={"variable-info " +
							(trait === 1 ? "is-not-the-number-in-trait" : "is-the-number-in-trait")}
						>{nbBlack}</span
					>
					<br />
					PIONS
				</p>
			</div>
		</div>
		<div
			class={"black-player " +
				(trait === 1 ? "is-the-player-in-trait" : "is-not-the-player-in-trait")}
		>
			<div class="pawn-element-value">
				<div class="pawn-value-container">
					<Pawn color="white" />
				</div>
			</div>
			<div>
				<p class="number-point">
					<span
						class={"variable-info " +
							(trait === 1 ? "is-the-number-in-trait" : "is-not-the-number-in-trait")}
						>{nbWhite}</span
					>
					<br />
					PIONS
				</p>
			</div>
		</div>
	</div>
	<div class="progress-bar-container">
		<div class="progress-bar-infos">
			<span class="color-text">{"Noir " + Math.round((nbBlack / somme) * 100) + "%"}</span>
			<span class="color-text">{"Blanc " + Math.round((nbWhite / somme) * 100) + "%"}</span>
		</div>
		<progress id="file" max={nbBlack + nbWhite} value={nbBlack}></progress>
	</div>
</div>

<style>
	.panel {
		top: 7.5vh;
		position: absolute;
		width: 20%;
		display: flex;
		flex-direction: column;
		height: calc(var(--board-size) + 7 * var(--line-gap));
		background:
			linear-gradient(215deg, #3f2813, #1c1917, #1c1917), var(--color-gradiant-background);
		border: var(--border-panel);
		border-radius: 1.5rem;
		padding: var(--padding-height-panel) var(--padding-width-panel) var(--padding-height-panel)
			var(--padding-width-panel);
		align-items: center;
		box-shadow: var(--box-shadow-panel);
	}

	.progress-bar-infos {
		display: flex;
		justify-content: space-evenly;
	}

	.progress-bar-container {
		display: flex;
		flex-direction: column;
		margin-top: var(--margin-top-space-element);
		width: 100%;
	}

	progress {
		width: 100%;
		accent-color: black;
	}

	.black-part {
		background-color: black;
	}

	.white-part {
		background-color: white;
	}

	.is-the-number-in-trait {
		color: rgb(252 211 77 / var(--tw-text-opacity, 1));
	}

	.is-the-not-number-in-trait {
		color: white;
	}

	.is-the-player-in-trait {
		border: 2px solid var(--border-color-trait-child);
	}

	.is-not-the-player-in-trait {
		border: 1px solid rgb(255 255 255 / 15%);
	}

	.players-info {
		display: grid;
		grid-template-columns: 1fr 1fr;
		margin-top: var(--margin-top-space-element);
		width: 100%;
		gap: var(--gap-info);
	}

	.number-point {
		display: flex;
		flex-direction: column;
		align-items: center;
		color: var(--color-text-inert);
	}

	.black-player {
		padding: var(--padding-container);
		display: grid;
		place-items: center;
		grid-template-columns: 1fr 2fr;
		border-radius: var(--border-radius-container);
	}

	.freedoms {
		font-weight: 500;
		font-family: var(--font-family-trait);
		color: rgb(255 255 255 / 80%);
	}

	.panel-presentation {
		margin-bottom: var(--margin-top-space-element);
		border-bottom: 1px solid rgb(255 255 255 / 25%);
		width: 100%;
	}

	.info {
		color: var(--color-info);
		font-weight: 600;
		font-size: var(--font-size-title-name);
		font-family: var(--font-family-trait);
	}

	.trait-text {
		color: var(--color-text-inert);
	}

	.pawn-trait-container {
		position: absolute;
		width: var(--width-pawn-trait);
		height: var(--height-pawn-trait);
	}

	.pawn-value-container {
		position: absolute;
		width: var(--width-pawn-value);
		height: var(--height-pawn-value);
	}

	.pawn-element {
		width: var(--width-pawn-trait);
		height: var(--height-pawn-trait);
	}

	.pawn-element-value {
		width: var(--width-pawn-value);
		height: var(--height-pawn-value);
	}

	.variable-info {
		font-weight: 700;
		font-size: var(--font-size-title-name);
		font-family: var(--font-family-trait);
	}

	.trait-id {
		color: var(--color-text-inert);
		font-family: var(--font-family-trait);
		font-size: 0.8rem;
		font-weight: bold;
		margin: 0;
	}

	.color-text {
		color: var(--color-text-inert);
		font-family: var(--font-family-trait);
		font-size: 0.9rem;
	}

	.trait-container {
		padding: var(--padding-container);
		display: flex;
		flex-direction: column;
		align-items: center;
		background-color: black;
		border: 1px solid rgb(255 255 255 / 15%);
		border-radius: var(--border-radius-container);
		width: 100%;
	}

	.trait-child {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: var(--gap-trait-child);
		border-radius: var(--border-radius-trait-child);
		border: 2px solid var(--border-color-trait-child);
		background: var(--gradient-background-trait-child);
		width: var(--width-trait-child);
		margin: var(--margin-trait-child);
		padding-left: var(--padding-left-trait-child);
	}

	span {
		color: white;
	}
</style>
