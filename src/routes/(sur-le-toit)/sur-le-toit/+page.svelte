<script lang="ts">
    import { floors$, height$, started$, width$, createMaze } from "./state.store";
    import Maze from "./Maze.svelte";

    import "./styles.css";

    function solveLabyrinth() {
        started$.set(false);
    }

</script>

<svelte:head>
  <title>Sur le toit</title>
</svelte:head>

{#if $started$}
    <button class="demarrage" onclick={solveLabyrinth}>Trouver la sortie</button>
    <Maze></Maze>
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