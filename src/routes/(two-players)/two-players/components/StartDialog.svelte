<script lang="ts">
	import { tick } from "svelte";
	import { commencerOrdi, level$, levelColor$ } from "../code";

	let dialog: HTMLDialogElement | undefined = $state(undefined);
	let isOpen = $state(false);

	export async function open() {
		isOpen = true;
		await tick();
		dialog?.showModal();
	}

	function onclose() {
		isOpen = false;
	}

</script>

{#if isOpen}
	<dialog bind:this={dialog} {onclose}>
		<div class = "slider_conteneur">
			<label for="gameLevel" class="niveau">Niveau de jeu</label>
			<input
				id="gameLevel"
				type="range"
				name="note"
				min="1"
				max="10"
				step="1"
				bind:value={$level$}
				class="niveauOrdi"
				style:accent-color={$levelColor$}
			/>
			<p class="slider_value">Valeur actuelle : {$level$}</p>
		</div>
		<div class="valider">
			<button onclick={() => commencerOrdi()}>Valider</button>
		</div>
	</dialog>
{/if}