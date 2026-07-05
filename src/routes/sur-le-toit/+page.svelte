<script>
    import { counter$, double$, increment} from "./state.store";
</script>

<div class="laby3D">
    <button type="button" onclick={increment}>Ajouter 1</button>
    <p>Compteur: {$counter$}</p>
    <p>Double: {$double$}</p>
</div>

<style>
    .laby3D {
        padding: 1rem;
    }
</style>