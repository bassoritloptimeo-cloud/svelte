<script lang="ts">
	import { gameStarted$ } from "./code";

	import Game from './components/Game.svelte';
	import Menu from './components/Menu.svelte';
	import SettingsDialog from "./components/SettingsDialog.svelte";
	
	import './styles.css';

</script>
<div class="plateau">
	{#if !$gameStarted$}
		<Menu />
	{:else}
		<Game />
	{/if}
</div>
<SettingsDialog />

