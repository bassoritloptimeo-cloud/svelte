<script lang="ts">
	import {number$, add} from "./state.store";
	import "./styles.css";
</script>

<div class="container">
	<h3>{$number$}</h3>
	<button onclick={add}>ajouter 1</button>
</div>