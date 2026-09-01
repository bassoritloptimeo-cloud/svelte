<script lang="ts">
	import { backgroundColor$, gameStarted$, editing$ } from "./code";
	
	import Edition from './components/game/Edition.svelte';
	import Game from './components/game/Game.svelte';
	import Menu from './components/Menu.svelte';
	import SettingsDialog from "./components/SettingsDialog.svelte";
	
	import './styles.css';

</script>
 
<div class={`plateau ${$backgroundColor$}`}>
	{#if !$gameStarted$}
		<Menu />
	{:else}
		{#if $editing$}
			<Edition />
		{:else}
			<Game />
		{/if}
	{/if}
</div>
<SettingsDialog />

<style>
	.player1 {
		background-color: green;
	}

	.player2 {
		background-color: red;
	}
</style>

