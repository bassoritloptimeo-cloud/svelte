<script lang="ts">
	import { tick } from "svelte";
	import { commencerOrdi, humanColor$, humanErrors$, level$, levelColor$ } from "../code";

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
		<div class="slider_conteneur">
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
			<label for="humanLevel" class="niveau">Taux d'erreur</label>
			<input
				id="humanLevel"
				type="range"
				name="note"
				min="0"
				max="10"
				step="1"
				bind:value={$humanErrors$}
				class="niveauOrdi"
				style:accent-color={$humanColor$}
			/>
			<p class="slider_value">Valeur actuelle : {$humanErrors$}</p>
		</div>

		<div class="valider">
			<button
				onclick={() => {
					commencerOrdi();
					dialog?.close();
				}}>Valider</button
			>
		</div>
	</dialog>
{/if}

<style>
	.slider_conteneur {
		margin-left: 50px;
		margin-right: 50px;
	}
</style>
