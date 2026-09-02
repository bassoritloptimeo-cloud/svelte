<script lang="ts">
	import { settings$, backgroundColor$, gameStarted$, editing$ } from "./code";
	
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
			{#if $settings$}
				<SettingsDialog />
			{/if}
		{/if}
	{/if}
	
</div>

<style>
	.player1 {
		background-color: rgb(0, 220, 0);
	}

	.player2 {
		background-color: rgb(255, 0, 0);
	}
</style>

