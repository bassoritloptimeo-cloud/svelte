<script lang="ts">
    import { floors$, height$, started$, width$, createMaze, onkeydown, win$, newGame } from "./state.store";
    import Maze from "./Maze.svelte";

    import "./styles.css";

    function solveLabyrinth() {
        started$.set(false);
    }

</script>

<svelte:head>
  <title>Sur le toit</title>
</svelte:head>

<svelte:document {onkeydown} />

{#if $started$}
    <button class="demarrage" onclick={solveLabyrinth}>Trouver la sortie</button>
    <Maze></Maze>
	{#if $win$}
		<dialog open>
			Vous avez gagné !
			<div class="buttons">
				<button onclick={newGame}>Nouveau jeu</button>
			</div>
		</dialog>
	{/if}

{:else}
    <div class="highButton">
        <button class="position" onclick={() => createMaze()}>Créer le jeu</button>
    </div>
    <div class="settings">
        <h3>Hauteur</h3>
        <div class="slide">
            <input type="range" min="1" max="50" bind:value={$height$} class="slider slider_height" >
            <h4 class="height">{$height$}</h4>
        </div>
        <h3>Largeur</h3>
        <div class="slide">
            <input type="range" min="1" max="50" bind:value={$width$} class="slider slider_width">
            <h4 class="width">{$width$}</h4>
        </div>
        <h3>Longueur</h3>
        <div class="slide">
            <input type="range" min="1" max="50" bind:value={$floors$} class="slider slider_length">
            <h4 class="length">{$floors$}</h4>
        </div>
    </div>
{/if}
<style>
	dialog {
		text-align: center;
	}
	.buttons {
		padding: 1rem;
	}
</style>
