<script lang="ts">
	import { onMount, tick } from 'svelte';
	import { settings$, maxWorkers$, workerActive$ } from '../code';
	import { writable } from 'svelte/store';

	const options$ = writable([2,4, 6, 8, 10, 12, 14, 16]);

	let dialog: HTMLDialogElement | undefined = $state(undefined);

	onMount(async () => {
		await tick();
		dialog?.showModal();
	});

	function onclose() {
		settings$.set(false);
	}

	function valider() {
		dialog?.close();
	}
</script>

<dialog id="dialog_Menu" bind:this={dialog} {onclose}>
	<div class="slider_conteneur">
		<div class="options">
			<div class="label_content">
				<label for="abset-move-annotation">
					<input class="eval-checkbox" type="checkbox" name="case1" />Activer l'évaluation
				</label>
			</div>
			<div class="label_content">
				<label>
					<input class="mCoup" type="checkbox" name="case1" />Montrer le meilleur coup
				</label>
			</div>
			<div class="label_content">
				<label>
					<input class="dCoup" type="checkbox" name="case1" />Afficher le dernier coup
				</label>
			</div>
			<div class="label_content">
				<label>
					<input class="evalEnnemi" type="checkbox" name="case1" />Montrer l'évaluation calculée
				</label>
			</div>
			<div class="label_content">
				<label for="abset-move-annotation">
					<input class="negInfo-checkbox" type="checkbox" name="case1" />Afficher les informations
					negamax
				</label>
			</div>
			<label for="pet-select">Nombre de coeurs actifs :</label>
			<select id="pet-select" name="pets" class="thread-Select" bind:value={$workerActive$}>
				{#each $options$ as $option$, x (x)}
					{#if $option$ < $maxWorkers$}
						<option value={$option$}>{$option$}</option>
					{:else}
						<option value={$option$} class="unselectable">{$option$}</option>
					{/if}
				{/each}
			</select>
		</div>
		<div class="actifs"></div>
		<button onclick={valider}>Valider</button>
	</div>
</dialog>

<style>

	.unselectable {
		background-color: rgb(119, 119, 119);
		color: white;
	}

</style>
